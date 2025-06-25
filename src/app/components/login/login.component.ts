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
    user_email: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(
        '^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$'
      ),
    ]),
  });
  constructor(private loginservice:LoginService,private router:Router ,private token_servic:TokenServiceService) {}

   //to send date to api and create jwt token
  // send_data() {
  //   if (this.myform.valid) {
  //     const loginData: Ilogin = {
  //       email: this.myform.value.user_email || '',
  //       password: this.myform.value.password || '',
  //     };

  //     this.loginservice.login(loginData).subscribe({
  //       next: (response: any) => {
  //         if (response.token) {
  //           this.loginservice.settoken(response.token);
  //           console.log(this.loginservice.settoken(response.token))
  //           console.log(response.token)
  //           this.router.navigate(['/home']);
           
  //         } else {
  //           console.error('Login failed: No token in response');
  //         }
  //       },
  //       error: (err:any) => {
  //         alert('Login failed');
  //        console.log(err);
  //       },
  //     });
  //   } else {
  //     alert('Please Enter your Email and password');
  //   }
  // }

//   send_data() {
//   if (this.myform.valid) {
//     const loginData: Ilogin = {
//       email: this.myform.value.user_email || '',
//       password: this.myform.value.password || '',
//     };

//     this.loginservice.login(loginData).subscribe({
//       next: (response: any) => {
//         if (response.token) {
//           // حفظ التوكن
//           this.loginservice.settoken(response.token);
//           console.log(response.token);

//           // 👇 حفظ الـ userId لو راجع في الـ response
//           if (response.userId) {
//             localStorage.setItem('userId', response.userId);
//             console.log('Saved userId:', response.userId);
//           }

//           // التوجيه
//           this.router.navigate(['/home']);
//         } else {
//           console.error('Login failed: No token in response');
//         }
//       },
//       error: (err: any) => {
//         alert('Login failed');
//         console.log(err);
//       },
//     });
//   } else {
//     alert('Please Enter your Email and password');
//   }
// }
/////////////////////////////////////////////////////////////////////////////////////////////////////////
send_data() {
  if (this.myform.valid) {
    const loginData: Ilogin = {
      email: this.myform.value.user_email || '',
      password: this.myform.value.password || '',
    };

    this.loginservice.login(loginData).subscribe({
      next: (response: any) => {
        if (response.token) {
          // حفظ التوكن
          this.loginservice.settoken(response.token);

          // جلب الدور من التوكن مباشرة
          const role = this.token_servic.getRole();

          if (role === 'Admin') {
            this.router.navigate(['/bookforadmin']);
          } else {
            this.router.navigate(['/home']);
          }

          // لو بتحتاج تخزن userId في localStorage أو أي مكان تاني
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
