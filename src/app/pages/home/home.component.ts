import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
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
