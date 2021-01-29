import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    // private cookieService: CookieService
    ) {

  }
  canActivate(): boolean {
    const authInfo: any = JSON.parse(localStorage.getItem('user-info'));
    if (authInfo) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
