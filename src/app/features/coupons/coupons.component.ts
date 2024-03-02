import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Coupon } from '../../models/coupon';
import { CouponsService } from '../../services/coupon/coupons.service';

@Component({
  selector: 'app-coupons',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.scss'
})
export class CouponsComponent implements OnInit {
  coupons: Coupon[] = [];

  constructor(private couponService: CouponsService) {

  }

  ngOnInit(): void {
    this.couponService.fetchCoupons().subscribe(
      (coupons: Coupon[]) => {
        console.log('Fetched Coupons:', coupons); // Log fetched coupons
        this.coupons = coupons; // Assign fetched coupons to property
      },
      (error) => {
        console.error('Error fetching coupons:', error);
      }
    );
  }
}
