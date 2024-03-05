import { HttpInterceptorFn } from '@angular/common/http';

export const tokenHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("JWT_TOKEN");

  if(token){
    req = req.clone({
      setHeaders:{
        "Authorization": `Bearer ${token}`
      }
    });
  }
  return next(req);
};
