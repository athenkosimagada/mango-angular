import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Product } from '../../models/product';
import { ApiResponse } from '../../models/response';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http : HttpClient) { }

  fetchProducts(): Observable<Product[]> {
    return this.http.get<ApiResponse<Product[]>>(environment.productApiBaseUrl).pipe(
      map((response) => {
        if (response.isSuccess) {
          return response.result;
        } else {
          throw new Error(response.message);
        }
      }),
      catchError((error: any) => {
        console.error('An error occurred:', error);
        return throwError(error);
      })
    );
  }

  addProduct(data : Product):Observable<ApiResponse<Product>> {
    return this.http.post<ApiResponse<Product>>(environment.productApiBaseUrl,data);
  }

  updateProduct(data : Product):Observable<ApiResponse<Product>> {
    return this.http.put<ApiResponse<Product>>(environment.productApiBaseUrl,data);
  }

  getProduct(id : number):Observable<ApiResponse<Product>> {
    return this.http.get<ApiResponse<Product>>(environment.productApiBaseUrl + '/' + id);
  }

  deleteProduct(id : number):Observable<ApiResponse<Product>> {
    return this.http.delete<ApiResponse<Product>>(environment.productApiBaseUrl + '/' + id);
  }
}
