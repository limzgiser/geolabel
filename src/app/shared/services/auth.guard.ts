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
    // const cookieExists: boolean = this.cookieService.check('islogin');
    // console.log(cookieExists);

    // if (cookieExists) {
    //   return true;
    // } else {
    //   this.router.navigate(['/business/login']);
    //   return false;
    // }
    const authInfo: any = JSON.parse(sessionStorage.getItem('authInfo'));
    if (authInfo !== null && authInfo.islogin === true) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
