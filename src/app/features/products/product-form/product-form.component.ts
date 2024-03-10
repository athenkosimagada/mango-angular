import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  id:number = 0;

  constructor(
    private fb:FormBuilder,
    private productService: ProductService,
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
        this.productService.getProduct(res["id"]).subscribe({
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
      productId:0,
      name:new FormControl(null, Validators.required),
      price:new FormControl(null, Validators.required),
      description:new FormControl(null, Validators.required),
      categoryName:new FormControl(null, Validators.required),
      imageUrl:new FormControl(null, Validators.required),
    });
  }

  onFubmitForm(){
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if(this.isEdit) {
        this.productService.updateProduct(this.form.value)
        .subscribe({
          next: res => {
            console.log(res);
            this.toastr.success('Product is updated successfully');
            this.router.navigateByUrl("/admin/products");
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
        this.productService.addProduct(this.form.value)
        .subscribe({
          next: res => {
            console.log(res);
            this.toastr.success('Product is created successfully', 'Success');
            this.router.navigateByUrl("/admin/products");
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
