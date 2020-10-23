import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import { ProductService, ProductResponse, ProductRequest } from './services/product.service';

@Component({
   selector: 'app-products',
   templateUrl: './products.component.html',
   styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit, OnDestroy {

   //#region Variables
   @ViewChild(DatatableComponent)
   dataTable: DatatableComponent;

   readonly headerHeight = 50;
   readonly rowHeight = 100;

   private datatableBodyElement: Element;
   private recordLimit = 10;
   private offset = 1;
   private isClear = false;
   private productSubscription: Subscription;

   public sortBy = '';
   public ColumnMode = ColumnMode;
   public shortByOptions = [
      {
         name: 'Id',
         value: 'id'
      },
      {
         name: 'Size',
         value: 'size'
      },
      {
         name: 'Price',
         value: 'price'
      },
   ];
   public rows: ProductResponse[] = [];
   public isLoading = true;

   //#endregion

   //#region life cycle hooks

   constructor(
      private productService: ProductService,
      private el: ElementRef) {
   }

   @HostListener('window:scroll', ['$event'])
   scrollHandler(offsetY: number, isClear?: boolean): void {
      // total height of all rows in the viewport
      const viewHeight = this.el.nativeElement.getBoundingClientRect().height - this.headerHeight;
      if (offsetY === 0) {
         this.isLoading = false;
      }
      if (!this.isLoading && offsetY + viewHeight >= this.rows.length * this.rowHeight) {
         this.loadPage(this.sortBy, isClear);
      }
   }

   ngOnInit(): void {
      this.scrollHandler(0);
   }

   ngOnDestroy(): void {
      if (this.productSubscription) {
         this.productSubscription.unsubscribe();
      }
   }
   //#endregion

   //#region public methods
   public onSortOptionChange(event): void {
      this.rows = [];
      this.offset = 1;
      this.scrollHandler(0);
   }

   public onClearSorting(): void {
      if (this.sortBy) {
         this.rows = [];
         this.offset = 1;
         this.sortBy = '';
         this.scrollHandler(0, true);
      }
   }
   //#endregion

   //#region private methods
   private loadPage(sortBy?: string, isClear?: boolean): void {
      this.isLoading = true;
      if (this.productSubscription) {
         this.productSubscription.unsubscribe();
      }
      const productRequest: ProductRequest = {};
      productRequest._page = this.offset;
      productRequest._limit = this.recordLimit;
      productRequest._sort = sortBy;
      this.productSubscription = this.productService.getProducts(productRequest)
         .subscribe((productResponse: ProductResponse[]) => {
            if (productResponse && productResponse.length > 0) {
               const rows = [...this.rows, ...productResponse];
               this.rows = rows;
               if (sortBy && this.offset === 1 || isClear) {
                  this.setScrollToDefault();
               }
               this.offset++;
            }
            this.isLoading = false;
         }, (error) => {
            console.log('error: ', error);
         });
   }

   private setScrollToDefault(): void {
      this.datatableBodyElement = this.dataTable.element.querySelector('datatable-body');
      setTimeout(() => {
         this.datatableBodyElement.scrollTop = 1;
      }, 1);
   }
   //#endregion
}
