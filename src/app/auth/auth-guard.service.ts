import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  private checkLogin(url: string): boolean {
    if (AuthService.isUserLoggedIn()) {
      return true;
    }

    // Store the attempted URL for redirecting
    this.auth.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['login']);
    // this.router.navigate( ['/403'] );
    return false;
  }
}
