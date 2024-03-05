import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { LoginRequest } from '../../models/login-request';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../../models/response';
import { LoginResponse } from '../../models/login-response';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../models/register-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl:string = environment.authApiBaseUrl;
  JWT_TOKEN:string = "JWT_TOKEN";

  constructor(
    private http:HttpClient,
    private router: Router
  ){}

  login(data:LoginRequest):Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.apiUrl}/login`,data)
    .pipe(
      map((response) => {
        if(response.isSuccess){
          localStorage.setItem(this.JWT_TOKEN,response.result.token);
        }

        return response;
      })
    )
  }

  register(data:RegisterRequest):Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${this.apiUrl}/register`,data)
    .pipe(
      map((response) => {
        return response;
      })
    )
  }

  assignRole(data:RegisterRequest):Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${this.apiUrl}/AssignRole`,data)
    .pipe(
      map((response) => {
        return response;
      })
    )
  }

  getUserDetails = () => {
    const token = this.getToken();
    if(!token) return null;

    const decodedToken:any = jwtDecode(token);
    const userDetails = {
      id:decodedToken.sub,
      email:decodedToken.email,
      roles:decodedToken.role || []
    }

    return userDetails;
  }

  isLoggedIn = ():boolean => {
    const token = this.getToken();

    if(!token) return false;

    return !this.isTokenExpired();
  }

  private isTokenExpired() {
    const token = this.getToken();
    if(!token) return true;

    const decoded = jwtDecode(token);
    const isTokenExpired = Date.now() >= decoded['exp']! * 1000;
    if(isTokenExpired) this.logout();

    // console.log("Date now: ",Date.now());
    // console.log("Exp date: ",decoded['exp']! * 1000);
    return isTokenExpired;
  }

  logout = (): void => {
    localStorage.removeItem(this.JWT_TOKEN);
    this.router.navigate(["/"]);
  }

  private getToken = ():string | null => localStorage.getItem(this.JWT_TOKEN) || '';
}
