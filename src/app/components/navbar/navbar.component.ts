import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  userName = localStorage.getItem("userName");

  constructor(private router:Router){

  }

  logout() {
    localStorage.removeItem("userName");
    this.router.navigateByUrl("/account/login")
  }
}
