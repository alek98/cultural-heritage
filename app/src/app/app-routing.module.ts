import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChsComponent } from './components/admin/chs/chs.component';
import { ChtypesComponent } from './components/admin/chtypes/chtypes.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { NewsComponent } from './components/admin/news/news.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MyReviewsComponent } from './components/user/my-reviews/my-reviews.component';
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
        path: 'my-reviews',
        data: {roles: ['user']},
        canActivate: [RoleGuard],
        component: MyReviewsComponent
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
          {
            path: 'news',
            component: NewsComponent,
          }
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
