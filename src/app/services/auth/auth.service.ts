import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { RegisterRequestDto } from '../../models/registerRequestDto';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/response';
import { LoginRequestDto } from '../../models/loginRequestDto';
import { LoginResponse } from '../../models/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(data: LoginRequestDto):Observable<ApiResponse<LoginResponse>>{
    return this.http.post<ApiResponse<LoginResponse>>(environment.authApiBaseUrl + "/login",data);
  }
  register(data: RegisterRequestDto):Observable<ApiResponse<string>>{
    return this.http.post<ApiResponse<string>>(environment.authApiBaseUrl + "/register",data);
  }
  asignRole(data: RegisterRequestDto):Observable<ApiResponse<string>>{
    return this.http.post<ApiResponse<string>>(environment.authApiBaseUrl + "/AssignRole",data);
  }
}
