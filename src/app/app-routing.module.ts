import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ManageProductComponent } from './products/manage-product/manage-product.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: '', component: ProductCategoryComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'manage-product/:id', component: ManageProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
