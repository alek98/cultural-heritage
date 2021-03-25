import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  formState: 'loading' | 'sucess' | 'fail';


  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: '',
      password: '',
      name: '',
    })
  }

  async onSubmit() {
    this.formState = 'loading';
    const { email, password, name } = this.signupForm.value;
    if(name === ''){
      this.formState = 'fail';
      this.openFailSnackBar('Full Name cannot be empty');
      return;
    }
    try{
      await this.auth.signup(email, password, name);
      this.formState = 'sucess';
      this.openSuccessSnackBar('Account successfully created.');
      this.router.navigate(['/']);
    }
    catch(error) {
      this.formState = 'fail';
      this.openFailSnackBar(error.message);
    }
  }

  async googleSignin(){
    try{
      await this.auth.googleLogin();
      this.formState = 'sucess';
      this.openSuccessSnackBar('Successfully logged in.');
      this.router.navigate(['/']);
    }
    catch(error) {
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
