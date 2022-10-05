import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product';
import { Subscription } from 'rxjs';

@Component({
    selector: 'pm-product-shell-detail',
    templateUrl: './product-shell-detail.component.html'
})
export class ProductShellDetailComponent implements OnInit, OnDestroy {
  pageTitle = 'Product Detail';
  product!: IProduct | null;
  errorMessage =  '';
  sub!: Subscription;

  // // using a getter to update the view for selected product
  // get product(): IProduct | null {
  //   return this.productService.currentProduct;
  // }

  // using Subject as an observable to subscribe new select product


    constructor(private productService: ProductService) { }

    ngOnInit() {
      this.sub = this.productService.selectedProductChanges$.subscribe(selectedProduct => this.product = selectedProduct);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe(); 
    }

}
