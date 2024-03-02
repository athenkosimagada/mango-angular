import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;


  constructor(
    private fb:FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
    ) {
  }

  ngOnInit(): void {
    this.form =  this.fb.group({
      userName:new FormControl(null,  [
        Validators.required,
        Validators.email
      ]),
      password:new FormControl(null,  [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  onFubmitForm(){
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.authService.login(this.form.value).subscribe({
      next: (res) => {
        if(res.isSuccess){
          console.log(res);
          localStorage.setItem("userName",res.result.user.email);
          this.toastr.success('Logged in successfully');
          this.router.navigateByUrl("/");
        }
      },
      error: err => {
        this.toastr.error(err.error.message, 'Error');
      }
    });
  }
}
