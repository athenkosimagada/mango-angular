import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CouponsComponent } from './features/coupons/coupons.component';
import { CouponFormComponent } from './features/coupons/coupon-form/coupon-form.component';
import { CouponDeleteComponent } from './features/coupons/coupon-delete/coupon-delete.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ProductsComponent } from './features/products/products.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "admin/coupons",
        component: CouponsComponent,
        canActivate:[authGuard]
    },
    {
        path: "admin/coupons/upsert/:id",
        component: CouponFormComponent,
        canActivate:[authGuard]
    },
    {
        path: "admin/coupons/upsert",
        component: CouponFormComponent,
        canActivate:[authGuard]
    },
    {
        path: "admin/coupons/delete/:id",
        component: CouponDeleteComponent,
        canActivate:[authGuard]
    },
    {
        path: "admin/products",
        component: ProductsComponent,
        canActivate:[authGuard]
    },
    {
        path: "account/register",
        component: RegisterComponent
    },
    {
        path: "account/login",
        component: LoginComponent
    }
];
