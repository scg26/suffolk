import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
userLoggedin!: boolean;

  constructor(private auth: AuthService, 
    private router: Router) {
      this.auth.isLoggedIn.subscribe((status => {
        this.userLoggedin = status;
      }));
     }

  canActivate(route: any, state: RouterStateSnapshot){
      if (this.userLoggedin){
        return true;
      } 

      this.router.navigate(['/login'], {queryParams: { returnUrl: state.url}});
      return false;

  }
    
  }
