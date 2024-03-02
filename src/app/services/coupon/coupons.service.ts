import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coupon } from '../../models/coupon';
import { Observable, throwError  } from 'rxjs';
import { ApiResponse } from '../../models/response';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  constructor(private http : HttpClient) { }

  fetchCoupons(): Observable<Coupon[]> {
    return this.http.get<ApiResponse<Coupon[]>>(environment.couponApiBaseUrl).pipe(
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

  addCoupon(data : Coupon):Observable<ApiResponse<Coupon>> {
    return this.http.post<ApiResponse<Coupon>>(environment.couponApiBaseUrl,data);
  }

  updateCoupon(data : Coupon):Observable<ApiResponse<Coupon>> {
    return this.http.put<ApiResponse<Coupon>>(environment.couponApiBaseUrl,data);
  }

  getCoupon(id : number):Observable<ApiResponse<Coupon>> {
    return this.http.get<ApiResponse<Coupon>>(environment.couponApiBaseUrl + '/' + id);
  }

  deleteCoupon(id : number):Observable<ApiResponse<Coupon>> {
    return this.http.delete<ApiResponse<Coupon>>(environment.couponApiBaseUrl + '/' + id);
  }
}
