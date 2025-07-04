import { Component } from '@angular/core';
import { TokenServiceService } from '../../../services/token-service.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [
    CommonModule,
    RouterLink,
    RouterModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
 userlogin: string | null = null;
  role: string | null = null;
  myroute: string = '';

  constructor(private tokenService: TokenServiceService, private router: Router) {}

  ngOnInit(): void {
    this.tokenService.token.subscribe((token) => {
      if (token) {
        this.loadUserData();
      } else {
        this.userlogin = null;
        this.role=null;
        this.myroute = '/home';
      }
    });
  }

  loadUserData() {
    this.userlogin = this.tokenService.getUsername();
    this.role = this.tokenService.getRole();
    this.setRouteBasedOnRole();
  }

  setRouteBasedOnRole() {
    if (this.role === 'Admin') {
      this.myroute = '/bookforadmin';
    } else {
      this.myroute = '/books';
    }
  }

  logout() {
    this.tokenService.cleartoken();
    this.router.navigate(['/home']);
    this.myroute = '/home';
  }

  isLoggedIn(): boolean {
    return !!this.tokenService.gettoken();
  }
}
