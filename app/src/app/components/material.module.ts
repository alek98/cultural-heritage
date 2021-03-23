import { NgModule } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { HomePageComponent } from './home-page/home-page.component';
import { SignupComponent } from './signup/signup.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import { LoginComponent } from './login/login.component'
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common'
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  declarations: [HomePageComponent, SignupComponent, ToolbarComponent, LoginComponent]
})
export class MaterialModule {}
