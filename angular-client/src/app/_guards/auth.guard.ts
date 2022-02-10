import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../core/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.loggedIn) {
      console.log('hey buddy');
      return true;
    } else {
      this.authService.logIn(state.url);
      console.log("that's my purse I don't know you");
      return false;
    }
  }
}
