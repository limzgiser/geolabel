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
import {NzMessageService} from "ng-zorro-antd/message";

// interface CustomHttpConfig {
//   headers?: HttpHeaders;
// }

const ERR_MSG = '请求失败';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(    private mzMessageService: NzMessageService,) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let url = req.url;
    let httpConfig = {};
    let accessTokenInfo = localStorage.getItem('accessToken')
    
  // // if(window['__POWERED_BY_QIANKUN__']){   
  //     if(false){
  //     if(url.startsWith('./assets/')){
  //       let tmpUlrs = url.split('./assets/')
  //       let hostUrl = document.querySelector('meta[name="sevHost"]').getAttribute('content'); 
  //       let resURL   = hostUrl + 'assets/'+ tmpUlrs[1];
  //       httpConfig = {   
  //        url:resURL,
  //        withCredentials: true 
  //       };
  //     }
  //  }else{
    if(accessTokenInfo){
      let accessToken = JSON.parse(accessTokenInfo).value;
      const needToken = req.headers.get('needToken');
      if(needToken){
        httpConfig = {  url, 
           headers: req.headers .set('Authorization', `Bearer ${accessToken}`),
        };
      }else{
        httpConfig = {    url,   };
      }
    }else{
      httpConfig = {  url};
    }
  //  }
 
    const copyReq = req.clone(httpConfig);
    return next
      .handle(copyReq)
      .pipe(catchError((error) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (typeof error.error?.ret === 'number') {
      // 后台拒绝请求
      this.mzMessageService.error(error.error.message || ERR_MSG);
    } else {
      this.mzMessageService.error(ERR_MSG);
    }
    return throwError(error);
  }
}
