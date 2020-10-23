import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WEB_API_URL } from '../../providers/constant';


@Injectable()
export class ProductService {

   private url = WEB_API_URL;

   constructor(private http: HttpClient) { }

   public getProducts(productRequest: ProductRequest): Observable<ProductResponse[]> {
      if (productRequest._sort) {
         return this.http.get<ProductResponse[]>(`${this.url}products?_page=${productRequest._page}&_limit=${productRequest._limit}&_sort=${productRequest._sort}`);
      } else {
         return this.http.get<ProductResponse[]>(`${this.url}products?_page=${productRequest._page}&_limit=${productRequest._limit}`);
      }
   }
}

export interface ProductResponse {
   _id?: string;
   _size?: number;
   _price?: number;
   _face?: string;
   _date?: Date;
}

export interface ProductRequest {
   _page?: number;
   _limit?: number;
   _sort?: string;
}
