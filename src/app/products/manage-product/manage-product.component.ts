import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ProductCategoryModel } from 'src/app/models/productCategory.model';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {

  isEditMode: boolean=false;
  inProgress: boolean=false;
  id: number=0;
  public productForm: FormGroup= this.fb.group({
    name: ['', [Validators.required]],
    description: ['', ''],
    categoryId: ['', [Validators.required]],
    qty: ['', [Validators.required]],
    price: ['', [Validators.required]]
  });
  productInfo: ProductModel=new ProductModel();

  constructor(private activeRoute: ActivatedRoute, private cService: CommonService, private fb: FormBuilder, private productService: ProductService) { }

  categoryList: Array<ProductCategoryModel>= new Array<ProductCategoryModel>();
  ngOnInit() {
    this.inProgress = false;
    this.productInfo = new ProductModel();
 debugger
    this.id = this.activeRoute.snapshot.params.id;
    if (this.id == 0) {
      this.isEditMode = false;
    } else {
      this.isEditMode = true;
      this.getProduct(this.id)
    }
    this.getCategoriesList();
  }

  getCategoriesList() {
    this.categoryList = this.productService.getCategoriesList();
  }

  getProduct(productId: number) {
      this.productInfo =this.productService.getProductById(productId);
  }

  saveProduct() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    this.inProgress = true;
    if (this.isEditMode) {
      if(this.productService.updateProduct(this.productInfo)) {
        this.cService.getToaster('Product updated succesfully', 'success', 'Success');
        window.location.href = window.location.origin + "/products";
        this.inProgress = false;
      }else{
        this.inProgress = false;
        this.cService.getToaster('Application error', 'error', 'Error');
      };
    } else {
      if(this.productService.saveProduct(this.productInfo)) {
        this.cService.getToaster('Product saved succesfully', 'success', 'Success');
        window.location.href = window.location.origin + "/products";
        this.inProgress = false;
      }else {
        this.inProgress = false;
        this.cService.getToaster('Application error', 'error', 'Error');
      };
    }
  }
  
}
