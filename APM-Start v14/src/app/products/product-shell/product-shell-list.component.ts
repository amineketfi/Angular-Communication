import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { IProduct } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-shell-list',
  templateUrl: './product-shell-list.component.html'
})
export class ProductShellListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  products: IProduct[] = [];
  errorMessage = '';
  selectedProduct!: IProduct | null;
  sub!: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => this.products = products,
      error: err => this.errorMessage = err
    });
    this.sub = this.productService.selectedProductChanges$.subscribe(product =>  {
      this.selectedProduct = product;
    })
  }

  onSelected(product : IProduct) {
    // this.productService.currentProduct = product; ==> Change detection
    this.productService.onProductChanges(product);
  }
  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }



}
