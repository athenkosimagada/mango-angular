import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  form!: FormGroup;
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

    this.form.get('name')?.disable();
    this.form.get('price')?.disable();
    this.form.get('description')?.disable();
    this.form.get('categoryName')?.disable();
    this.form.get('imageUrl')?.disable();
  }

  onFubmitForm(){
    this.productService.deleteProduct(this.form.value.productId)
    .subscribe({
      next: res => {
        console.log(res);
        this.toastr.success('Product is deleted successfully');
        this.router.navigateByUrl("/admin/products");
      },
      error: err => {
        console.log(err)
        if(err.status == 403) {
          this.toastr.error("Access denied");
        } else {
          this.toastr.error(err.message);
        }
      }
    })
  }
}
