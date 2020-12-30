import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DefaultInterceptor implements HttpInterceptor {
  constructor() { }
  token =
    "EZv8w2roJL2gUnRMUL5O93GTNXw7qboMYLfqoMTt2D7GKCsqpyDQRH3pAeKVNYuZUBk6opDK9Ivc6g+ycmrLKdtz3uB5t5w/alX1CDXsdQqTaGRjUISI+A==";
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const queryParamStr = req.url.split("?")[1];
    if (queryParamStr) {

      // if (req.url.indexOf('identify') >= 0) {
      //   req = req.clone({
      //     url: `${req.url}`
      //   });
      // } else {
      //   req = req.clone({
      //     url: `${req.url}&token=${this.token}`
      //   });
      // }
      req = req.clone({
        url: `${req.url}`
      });
    } else {
      // if (req.url.indexOf('identify') >= 0) {
      //   req = req.clone({
      //     url: `${req.url}`
      //   });
      // } else {
      //   req = req.clone({
      //     url: `${req.url}?token=${this.token}`
      //   });
      // }
      req = req.clone({
        url: `${req.url}`
      });
    }
    return next.handle(req);
  }
}
