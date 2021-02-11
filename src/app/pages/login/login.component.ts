import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Routes, RouterModule, Router } from "@angular/router";
import { AuthService } from "../../service/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;

  loginForm: FormGroup = this.fb.group({
    login: ['', [Validators.required, Validators.maxLength(10)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    checkbox: [false]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.loginForm.status === 'VALID') {
      this.login(this.loginControl.value, this.passwordControl.value);
    }

    for (const key in this.loginForm.controls) {
      const control = this.loginForm.controls[key];
      control.markAllAsTouched();
    }
  }

  private login(username: string, password: string) {
    this.loading = true;
    console.log(`user -> ${this.loginForm.get('login')}, Pass -> ${this.loginForm.get('password')}`)
    this.router.navigate(['/home']);
  }

  get loginControl() {
    return this.loginForm.get('login') as FormControl;
  }

  get loginControlValid() {
    return this.loginForm.touched;
  }

  get passwordControl() {
    return this.loginForm.get('password') as FormControl;
  }

  get passwordControlValid() {
    return this.passwordControl.touched && !this.passwordControlInvalid;
  }

  get passwordControlInvalid() {
    return (
      this.passwordControl.touched &&
      (this.passwordControl.hasError('required'))
    );
  }

}
