import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    public auth: AuthService,
    private formBuilder: FormBuilder,
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

    try{
      await this.auth.signup(email, password, name);
      this.formState = 'sucess'
    }
    catch(error) {
      this.formState = 'fail'
      console.log('err', error)
    }
    

  }

}
