import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { CouponsService } from '../services/coupon/coupons.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(!authService.isLoggedIn()){
    router.navigate(["account/login"]);
    return false;
  }
  return true;
};

export const resolveCoupons = () => {
  const couponService = inject(CouponsService);
  return couponService.fetchCoupons();
}
