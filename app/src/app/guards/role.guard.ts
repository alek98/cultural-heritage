import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
    let roles: string[] = route.data['roles'];

    return this.auth.user$.pipe(
      map(user => {
        // if user object is null or undefined -> return false -> means that no one is logged in
        // if user's role is not found in the array of roles -> return false 
        if (!user || roles.indexOf(user.role) == -1) {
          this.router.navigate(['/']);
          console.log('access denied')
          return false;
        }
        else return true;
      })
    )
  }
}
