import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';
import { ProductModel } from '../models/product.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Array<ProductModel>=new Array<ProductModel>();
  constructor(private cService: CommonService, private productService: ProductService, private modalService: NgbModal) { }
  inProgress: boolean = false;

  ngOnInit() {
    this.inProgress = true;
    this.products = new Array<ProductModel>();
    this.getProductsList();
  }

  getProductsList() {
    this.products = this.productService.getProductsList();
    this.inProgress = false;
  }

  deleteProduct(product: ProductModel) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted you cannot recover this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    })
      .then((willDelete) => {
        if (willDelete.value) {
          this.inProgress = true;
          if (this.productService.deleteProduct(product)) {
            this.inProgress = false;
            this.getProductsList();
            this.cService.getToaster('Product deleted succesfully', 'success', 'Success');
          } else {
            this.inProgress = false;
            this.cService.getToaster('Application error', 'error', 'Error');
          };
        }
      });
  }

  addEditProduct(id: number) {
    window.location.href = window.location.origin + "/manage-product/" + id;
  }

}
