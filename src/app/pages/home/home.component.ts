import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.productService.fetchProducts().subscribe({
      next: (res) => {
        this.products = res
        console.log(res)
      }, 
      error: (err) => {
        this.toastr.error(err.message);
      }
    })
  }
}
