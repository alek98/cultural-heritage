import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChsComponent } from './components/admin/chs/chs.component';
import { ChtypesComponent } from './components/admin/chtypes/chtypes.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: 'signup',
        component: SignupComponent  
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'manage',
        component: DashboardComponent,
        data: {roles: ['admin']},
        canActivate: [RoleGuard],
        children: [
          {
            path: 'cultural-heritage',
            component: ChsComponent,
          },
          {
            path: 'cultural-heritage-types',
            component: ChtypesComponent,
          },
        ]
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
