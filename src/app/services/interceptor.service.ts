import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// interface CustomHttpConfig {
//   headers?: HttpHeaders;
// }

const ERR_MSG = '请求失败';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let url = req.url;
    let httpConfig = {};
    let accessToken = JSON.parse(sessionStorage.getItem('authInfo')).data.accessToken;
    // if (url.indexOf('?') > -1) {
    //   url = accessToken ? url + '&token=' + accessToken : url;
    // } else {
    //   url = accessToken ? url + '?token=' + accessToken : url;
    // }
    if(accessToken){
      httpConfig = {
       url,
      // headers: req.headers .set('Authorization', `Bearer ${accessToken}`) // .set('Content-Type', `application/json`)
      };
    }else{
      httpConfig = {
        url,
        //headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
      };
    }

    // }
    // console.log(url);
    const copyReq = req.clone(httpConfig);
    return next
      .handle(copyReq)
      .pipe(catchError((error) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    // if (typeof error.error?.ret === 'number') {
    //   // 后台拒绝请求
    //   this.messageServe.error(error.error.message || ERR_MSG);
    // } else {
    //   this.messageServe.error(ERR_MSG);
    // }
    return throwError(error);
  }
}
