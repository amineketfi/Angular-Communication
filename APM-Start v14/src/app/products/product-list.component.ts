import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { CriteriaComponent } from '../shared/criteria/criteria.component';

import { IProduct } from './product';
import { ProductPropertyService } from './product-property.service';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  pageTitle = 'Product List';

  set showImage(value: boolean) {
    this.propertyService.showImage = value;
  }
  get showImage() {
    return this.propertyService.showImage;
  }


  imageWidth = 50;
  imageMargin = 2;
  errorMessage = ''

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  includeDetail = true;

  @ViewChild(CriteriaComponent) filterComponentRef!: CriteriaComponent;

  // Select a native element using template reference variable(#filterElement)

  // @ViewChild(NgModel) filterInput!: NgModel;

  // // Using a setter and a getter (Great Design Pattern)
  // private _listFilter=''; // a backing variable

  // set listFilter(value: string) {
  //   this._listFilter = value;
  //   this.performFilter(this._listFilter);
  // }

  // get listFilter() {
  //   return this._listFilter
  // }

  constructor(
    private productService: ProductService,
    private propertyService: ProductPropertyService
    ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        // setTimeout is used here to differ time and let the view of the child component to intialize before assigning a value
        setTimeout(() => {
          if(this.filterComponentRef) {
          this.filterComponentRef.listFilter = this.propertyService.filterBy;
          }
        })



      },
      error: err => this.errorMessage = err
    });
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy?: string): void {
    if (filterBy) {
      this.filteredProducts = this.products.filter(product =>
        product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
    } else {
      this.filteredProducts = this.products;
    }
  }

  // Getting hold of a native element always after a view is initialized
  ngAfterViewInit(): void {
    // this.parentListFilter = this.filterComponentRef.listFilter;
    // this.filterComponentRef.listFilter = this.propertyService.filterBy;
  }

  onValueChanges(value: string) {
    this.propertyService.filterBy = value;
    this.performFilter(value)
  }

  // // Two way binding the long form ( HTML ==> [ngModel]='listFilter'(ngModelChange)="onFilterChange($event) )
  // onFilterChange(filter: string): void {
  //   this.listFilter = filter;
  //   this.performFilter(this.listFilter);
  // }
}
