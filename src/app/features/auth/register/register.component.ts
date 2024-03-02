import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth/auth.service';
import { ApiResponse } from '../../../models/response';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form!: FormGroup;
  validadorPassword:string = "";

  constructor(
    private fb:FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private activatedRouter: ActivatedRoute,
    private authService: AuthService
    ) {
  }

  ngOnInit(): void {
    this.form =  this.fb.group({
      firstName:new FormControl(null, Validators.required),
      lastName:new FormControl(null, Validators.required),
      email:new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      phoneNumber:new FormControl(null, Validators.required),
      password:new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      role:"CUSTOMER"
    });
  }

  onFubmitForm(){
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.authService.register(this.form.value).subscribe({
      next: (res) => {
        if(res.isSuccess){
          this.authService.asignRole(this.form.value).subscribe();
          this.toastr.success('Registered successfully');
          this.router.navigateByUrl("/account/login");
        }
      },
      error: err => {
        if(err.error.message.includes("Password")){
          this.validadorPassword = err.error.message;
          return;
        }
        this.validadorPassword = "";
        this.toastr.error(err.error.message);
      }
    });
  }
}
