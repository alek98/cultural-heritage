import { NgModule } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { HomePageComponent } from './home-page/home-page.component';
import { SignupComponent } from './signup/signup.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import { LoginComponent } from './login/login.component'
@NgModule({
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
  ],
  declarations: [HomePageComponent, SignupComponent, ToolbarComponent, LoginComponent]
})
export class MaterialModule {}
