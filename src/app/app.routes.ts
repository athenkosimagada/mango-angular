import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CouponsComponent } from './features/coupons/coupons.component';
import { CouponFormComponent } from './features/coupons/coupon-form/coupon-form.component';
import { CouponDeleteComponent } from './features/coupons/coupon-delete/coupon-delete.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ProductsComponent } from './features/products/products.component';
import { authGuard, resolveCoupons } from './guards/auth.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProductDeleteComponent } from './features/products/product-delete/product-delete.component';
import { ProductFormComponent } from './features/products/product-form/product-form.component';
import { ProductDetailsComponent } from './pages/home/product-details/product-details.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "product-details/:id",
        component: ProductDetailsComponent,
        canActivate:[authGuard]
    },
    {
        path: "admin/coupons",
        component: CouponsComponent,
        canActivate:[authGuard],
        resolve: {coupons: resolveCoupons}
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
        path: "admin/products/upsert/:id",
        component: ProductFormComponent,
        canActivate:[authGuard]
    },
    {
        path: "admin/products/upsert",
        component: ProductFormComponent,
        canActivate:[authGuard]
    },
    {
        path: "admin/products/delete/:id",
        component: ProductDeleteComponent,
        canActivate:[authGuard]
    },
    {
        path: "account/register",
        component: RegisterComponent,
        canDeactivate: [(comp: RegisterComponent) => {return comp.canExit()}]
    },
    {
        path: "account/login",
        component: LoginComponent
    },
    {
        path: "**",
        component: PageNotFoundComponent
    }
];
