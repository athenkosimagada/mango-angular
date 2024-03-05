import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth/auth.service';

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
      next: (response) => {

        if(response.isSuccess){
          this.authService.assignRole(this.form.value).subscribe({
            next: (response) => {
              this.toastr.success("Registered successful");
              this.router.navigate(["account/login"]);
            },
            error: (error) => {
              this.toastr.error(error.error.message);
            }
          });
        } else{
          this.toastr.error(response.message);
        }
        
      },
      error: (error) => {
        this.toastr.error(error.error.message);
      }
    })
  }
}
