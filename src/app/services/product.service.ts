import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { ProductCategoryModel } from '../models/productCategory.model';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  constructor() { }

  categoriesList = new Array<ProductCategoryModel>();
  products = new Array<ProductModel>();
  public getCategoriesList(): Array<ProductCategoryModel> {
    this.categoriesList = JSON.parse(localStorage.getItem('categoriesList'));
    return this.categoriesList;
  }

  public getCategoryById(categoryId: number): ProductCategoryModel {
    this.getCategoriesList();
    return this.categoriesList.find(p => p.id = categoryId);
  }

  public saveCategory(categoryData: ProductCategoryModel): boolean {
    debugger
    this.getCategoriesList();
    if (this.categoriesList?.length) {
      categoryData.id = this.categoriesList.length + 1;
      this.categoriesList.push(categoryData);
    } else {
      this.categoriesList = new Array<ProductCategoryModel>();
      categoryData.id = 1;
      this.categoriesList.push(categoryData);
    }
    localStorage.removeItem('categoriesList')
    localStorage.setItem('categoriesList', JSON.stringify(this.categoriesList));
    return true;
  }

  public updateCategory(categoryData: ProductCategoryModel): boolean {
    this.getCategoriesList();

    this.categoriesList.forEach(p => {
      if (p.id == categoryData.id) {
        p.name = categoryData.name;
        p.description = p.description;
      }
    })

    localStorage.removeItem('categoriesList')
    localStorage.setItem('categoriesList', JSON.stringify(this.categoriesList));
    return true;
  }

  public deleteCategory(category: ProductCategoryModel): boolean {
    this.getCategoriesList();

    const index: number = this.categoriesList.indexOf(category);
    if (index !== -1) {
      this.categoriesList.splice(index, 1);
    }

    localStorage.removeItem('categoriesList')
    localStorage.setItem('categoriesList', JSON.stringify(this.categoriesList));
    return true;
  }

  public getProductsList(): Array<ProductModel> {
    this.products = JSON.parse(localStorage.getItem('products'));
    return this.products;
  }

  public getProductById(productId: number): ProductModel {
    return new ProductModel();
  }

  public saveProduct(productData: ProductModel): boolean {
    this.getProductsList();
    if (this.products?.length) {
      productData.id = this.products.length + 1;
      this.products.push(productData);
    } else {
      this.products = new Array<ProductModel>();
      productData.id = 1;
      this.products.push(productData);
    }
    localStorage.removeItem('products')
    localStorage.setItem('products', JSON.stringify(this.products));
    return true;
  }

  public updateProduct(productData: ProductModel): boolean {
    this.getProductsList();

    this.products.forEach(p => {
      if (p.id == productData.id) {
        p.name = productData.name;
        p.description = p.description;
      }
    })

    localStorage.removeItem('products')
    localStorage.setItem('products', JSON.stringify(this.products));
    return true;
  }

  public deleteProduct(product: ProductModel): boolean {
    this.getProductsList();

    const index: number = this.products.indexOf(product);
    if (index !== -1) {
      this.products.splice(index, 1);
    }

    localStorage.removeItem('products')
    localStorage.setItem('products', JSON.stringify(this.products));
    return true;
  }

   

}