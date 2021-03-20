import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // return this.auth.user.pipe(
    //   take(1),
    //   map(user => !! user),
    //   tap(loggedIn => {
    //     if(!loggedIn){
    //       console.log('access denied');
    //       this.router.navigate(['/login']);
    //     }
    //   })
    // )
    if(this.auth.user){
      return true;
    }
    else{
      console.log('access denied');
      this.router.navigate(['/']);
      return false;
    }
  }
  
}
