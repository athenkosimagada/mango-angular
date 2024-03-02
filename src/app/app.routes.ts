import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CouponsComponent } from './features/coupons/coupons.component';
import { CouponFormComponent } from './features/coupons/coupon-form/coupon-form.component';
import { CouponDeleteComponent } from './features/coupons/coupon-delete/coupon-delete.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ProductsComponent } from './features/products/products.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "admin/coupons",
        component: CouponsComponent
    },
    {
        path: "admin/coupons/upsert/:id",
        component: CouponFormComponent
    },
    {
        path: "admin/coupons/upsert",
        component: CouponFormComponent
    },
    {
        path: "admin/coupons/delete/:id",
        component: CouponDeleteComponent
    },
    {
        path: "admin/products",
        component: ProductsComponent
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
