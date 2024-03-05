import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CouponsService } from '../../../services/coupon/coupons.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-coupon-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  templateUrl: './coupon-form.component.html',
  styleUrl: './coupon-form.component.scss'
})
export class CouponFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  id:number = 0;

  constructor(
    private fb:FormBuilder,
    private couponService: CouponsService,
    private router: Router,
    private toastr: ToastrService,
    private activatedRouter: ActivatedRoute
    ) {
  }

  ngOnInit(): void {
    this.activatedRouter.params
    .subscribe({
      next: res => {
        this.id = res["id"];
        if(this.id == 0 || this.id == null) return;

        this.isEdit = true;
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
  }

  onFubmitForm(){
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if(this.isEdit) {
        this.couponService.updateCoupon(this.form.value)
        .subscribe({
          next: res => {
            console.log(res);
            this.toastr.success('Coupon is updated successfully');
            this.router.navigateByUrl("/admin/coupons");
          },
          error: err => {
            if(err.status == 403) {
              this.toastr.error("Access denied");
            } else {
              this.toastr.error(err.message);
            }
          }
        })
    } else {
        this.couponService.addCoupon(this.form.value)
        .subscribe({
          next: res => {
            console.log(res);
            this.toastr.success('Coupon is created successfully', 'Success');
            this.router.navigateByUrl("/admin/coupons");
          },
          error: err => {
            if(err.status == 403) {
              this.toastr.error("Access denied");
            } else {
              this.toastr.error(err.message);
            }
          }
        })
    }
  }
}
