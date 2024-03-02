import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CouponsService } from '../../../services/coupon/coupons.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-coupon-delete',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './coupon-delete.component.html',
  styleUrl: './coupon-delete.component.scss'
})
export class CouponDeleteComponent {
  form!: FormGroup;

  constructor(
    private fb:FormBuilder,
    private couponService: CouponsService,
    private router: Router,
    private toastr: ToastrService,
    private activatedRouter: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.activatedRouter.params
    .subscribe({
      next: res => {
        console.log(res["id"]);
        this.couponService.getCoupon(res["id"]).subscribe({
          next: res => {
            console.log(res);
            this.form.patchValue(res.result);
          },
          error: err => {
            console.error(err);
          }
        });
      },
      error: err => {
        console.error(err);
      }
    });
    this.form =  this.fb.group({
      couponId:0,
      couponCode:new FormControl(null, Validators.required),
      discountAmount:new FormControl(null, Validators.required),
      minAmount:new FormControl(null, Validators.required),
    });
    this.form.get('couponCode')?.disable();
    this.form.get('discountAmount')?.disable();
    this.form.get('minAmount')?.disable();
  }

  onFubmitForm(){
    this.couponService.deleteCoupon(this.form.value.couponId)
    .subscribe({
      next: res => {
        console.log(res);
        this.toastr.success('Coupon is deleted successfully');
        this.router.navigateByUrl("/admin/coupons");
      },
      error: err => {
        console.error(err);
      }
    })
  }
}
