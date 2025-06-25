import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-nav',
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  constructor(private loginService:LoginService, private router: Router) {}

  logout() {
    this.loginService.logout(); 
    this.router.navigate(['/login']); 
  }
}
