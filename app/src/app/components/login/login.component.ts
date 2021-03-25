import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  formState: 'loading' | 'sucess' | 'fail';

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: '',
    })
  }

  async onSubmit() {
    this.formState = 'loading';
    const { email, password } = this.loginForm.value;
    try {
      await this.auth.login(email, password);
      this.formState = 'sucess';
      this.openSuccessSnackBar('Successfully logged in.');
      this.router.navigate(['/']);
    }
    catch (error) {
      this.formState = 'fail';
      this.openFailSnackBar(error.message);
    }
  }

  async googleLogin() {
    try {
      await this.auth.googleLogin();
      this.formState = 'sucess';
      this.openSuccessSnackBar('Successfully logged in.');
      this.router.navigate(['/']);
    }
    catch (error) {
      this.formState = 'fail';
      this.openFailSnackBar(error.message);
    }
  }

  openSuccessSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      verticalPosition: 'top',
      panelClass: ['green-snackbar'],
      duration: 4000,
    });
  }
  openFailSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      verticalPosition: 'top',
    });
  }


}
