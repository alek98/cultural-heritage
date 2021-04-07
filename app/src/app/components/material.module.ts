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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ChsComponent } from './admin/chs/chs.component';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { AddNewChComponent } from './admin/chs/add-new-ch/add-new-ch.component';
import { MatSelectModule } from "@angular/material/select";
import { ChtypesComponent } from './admin/chtypes/chtypes.component';
import { AddNewChtypeComponent } from './admin/chtypes/add-new-chtype/add-new-chtype.component';
import { EditChtypeComponent } from './admin/chtypes/edit-chtype/edit-chtype.component';
import { DeleteChtypeComponent } from './admin/chtypes/delete-chtype/delete-chtype.component';
import { EditChComponent } from './admin/chs/edit-ch/edit-ch.component';
import { DeleteChComponent } from './admin/chs/delete-ch/delete-ch.component';
import { NewsComponent } from './admin/news/news.component';


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
    MatInputModule,
    MatSnackBarModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
  ],
  declarations: [HomePageComponent, SignupComponent, ToolbarComponent, LoginComponent, DashboardComponent, ChsComponent, AddNewChComponent, ChtypesComponent, AddNewChtypeComponent, EditChtypeComponent, DeleteChtypeComponent, EditChComponent, DeleteChComponent, NewsComponent]
})
export class MaterialModule {}
