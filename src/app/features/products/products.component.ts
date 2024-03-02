import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {

  }

  ngOnInit(): void {
    this.productService.fetchProducts().subscribe(
      (products: Product[]) => {
        console.log('Fetched Coupons:', products); // Log fetched coupons
        this.products = products; // Assign fetched coupons to property
      },
      (error) => {
        console.error('Error fetching coupons:', error);
      }
    );
  }
}
