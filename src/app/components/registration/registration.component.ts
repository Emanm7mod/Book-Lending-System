import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-registration',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit{
 successMessage: string | null = null;
  errorMessage: string | null = null;
  messageTimeout: any;

 registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private registerserv:LoginService,private router:Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['',  [
            Validators.required,
            Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/)
          ]],
        confirmPassword: ['', Validators.required],
        phoneNum: ['',  [ Validators.required,Validators.pattern(/^\+2\d{10}$/) ]]
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  // custom validator to check if passwords match
  passwordsMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      console.log('Form Data:', this.registerForm.value);
      const formValues = this.registerForm.value;
      const dataload = {
        username: formValues.fullName,
        email: formValues.email,
        password: formValues.password,
        phoneNumber: formValues.phoneNum
      };
      this.registerserv.register(dataload).subscribe({
        next:()=>{
          this.successMessage = 'The account hass been registered successfully!';
        this.errorMessage = null;
      
        // this.Message();
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
        },
        error:()=>{
          this.errorMessage = 'Failed to registered.';
        this.successMessage = null;
        }
      })
      // Send data to your API here
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
