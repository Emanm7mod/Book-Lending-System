import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { Ilogin } from '../../models/ilogin';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { TokenServiceService } from '../../services/token-service.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    RouterModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  myform = new FormGroup({
    user_email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$')
    ]),
    rememberMe: new FormControl(false)
  });

  get email() {
    return this.myform.get('user_email');
  }

  get password() {
    return this.myform.get('password');
  }

  constructor(private loginservice:LoginService,private router:Router ,private token_servic:TokenServiceService) {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      this.myform.patchValue({
        user_email: savedEmail,
        rememberMe: true
      });
    }
  }
  send_data() {
    if (this.myform.valid) {
      const loginData: Ilogin = {
        email: this.myform.value.user_email || '',
        password: this.myform.value.password || '',
      };
      if (this.myform.value.rememberMe) {
      localStorage.setItem('rememberedEmail', loginData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      this.loginservice.login(loginData).subscribe({
        next: (response: any) => {
          if (response.token) {
            this.token_servic.settoken(response.token);
            const role = this.token_servic.getRole();

            if (role === 'Admin') {
              this.router.navigate(['/bookborrowedAdmin']);
            } else {
              this.router.navigate(['/books']);
            }
            const userId = this.token_servic.getUserId();
            if (userId) {
              localStorage.setItem('userId', userId);
            }

          } else {
            console.error('Login failed: No token in response');
          }
        },
        error: (err: any) => {
          alert('Login failed');
          console.log(err);
        },
      });
      
    } else {
      alert('Please Enter your Email and password');
    }
  
  }

}
