import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';
import { ProductCategoryModel } from '../models/productCategory.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  constructor(private modalService: NgbModal, private cService: CommonService, private productService: ProductService) { }
  categories: Array<ProductCategoryModel> = new Array<ProductCategoryModel>();
  selectedProductCategory: ProductCategoryModel = new ProductCategoryModel();

  ngOnInit() {
     
    this.categories = new Array<ProductCategoryModel>();
    this.getCategoriesList();
  }

  getCategoriesList() {
    this.categories = this.productService.getCategoriesList();
  }

  openCategoryModal(content: any, isEditMode: boolean, category?: ProductCategoryModel) {
    this.selectedProductCategory = new ProductCategoryModel();
    if (isEditMode) {
      this.selectedProductCategory = category ? category : new ProductCategoryModel();
    }
    this.modalService.open(content, { size: "lg", backdrop: "static" });
  }

  saveCategory() {
    if (!this.selectedProductCategory.name || this.selectedProductCategory.name == '') {
      this.cService.getToaster('Kindly enter product categoty name.', 'info', 'Name Required');
      return
    }
    debugger

     
    if (this.selectedProductCategory.id) {
      if (this.productService.updateCategory(this.selectedProductCategory)) {
        this.cService.getToaster('ProductCategory updated succesfully', 'success', 'Success');
         
        this.getCategoriesList();
      }  
    } else {
      if (this.productService.saveCategory(this.selectedProductCategory)) {
        this.cService.getToaster('ProductCategory saved succesfully', 'success', 'Success');
         
        this.getCategoriesList();
      }  
    }
    this.modalService.dismissAll();
  }

  deleteCategory(category: ProductCategoryModel) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted you cannot recover this category!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    })
      .then((willDelete) => {
        if (willDelete.value) {
           
          if (this.productService.deleteCategory(category)) {
            this.cService.getToaster('Product Category deleted succesfully', 'success', 'Success');
            this.getCategoriesList();
          } else {
             
            this.cService.getToaster('Application error', 'error', 'Error');
          }
        }
      });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

}
