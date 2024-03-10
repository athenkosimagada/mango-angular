import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb:FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
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
      next: (response) => {
        this.toastr.success("Logged in successful");
        this.router.navigate(["/"]);
      },
      error: (error) => {
        this.toastr.error(error.error.message);
      }
    })
  }
}
