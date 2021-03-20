import { NgModule } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { HomePageComponent } from './home-page/home-page.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    MatToolbarModule
  ],
  declarations: [HomePageComponent, SignupComponent]
})
export class MaterialModule {}
