import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from './products.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { DateAgoPipe } from '../share/pipes/date-ago.pipe';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      NgxDatatableModule,
      HttpClientModule
   ],
   exports: [
   ],
   declarations: [
      ProductsComponent,
      DateAgoPipe
   ],
   providers: [
      ProductService
   ]
})
export class ProductModule {

}
