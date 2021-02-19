import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../service/auth/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loading: boolean = false;

  registerForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    login: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    console.log("ngOnInit");
  }

  private signIn(name: string, login: string, email: string, password: string) {
    this.loading = true;
    this.authService.signIn(name, login ,email, password).subscribe()
  }

  onSubmit() {
    console.log("onsubmit");

    if (this.registerForm.status === 'VALID') {
      this.signIn(this.nameControl.value,
        this.loginControl.value,
        this.emailControl.value,
        this.passwordControl.value);
    }

    for (const key in this.registerForm.controls) {
      const control = this.registerForm.controls[key];
      control.markAllAsTouched();
    }
  }

  get nameControl() {
    return this.registerForm.get('name') as FormControl;
  }

  get loginControl() {
    return this.registerForm.get('login') as FormControl;
  }

  get emailControl() {
    return this.registerForm.get('email') as FormControl;
  }

  get passwordControl() {
    return this.registerForm.get('password') as FormControl;
  }


}
