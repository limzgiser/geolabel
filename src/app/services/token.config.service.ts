import { Injectable } from '@angular/core';
import { map, switchMap, take } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CfhttpService } from './cfhttp.service';
import { Base, loginInfo, accessTokenInfo } from '../types/types';
import { Observable, of } from 'rxjs';

const authInfo = {
  password: 'admin',
  userName: 'admin',
  app_id: 'c71a41eb-4bc3-4938-8c9c-b9bc9a86e0c6',
  app_secret: '68b415a71bbf6c1c7e7b7d65780af423',
};

@Injectable({
  providedIn: 'root',
})
export class TokenConfigService {
  constructor(private cfhttpService: CfhttpService) {}
  resolve(): Observable<any> | Observable<never> {
    return this.cfhttpService
      .post('single.login', {
        password: authInfo.password,
        userName: authInfo.userName,
      })
      .pipe(
        map((res: Base<loginInfo>) => res.data),
        switchMap((loginInfo: loginInfo) => {
          let accessToken = loginInfo.accessToken;
          return this.cfhttpService
            .get('get.token', {
              params: {
                app_id: authInfo.app_id,
                app_secret: authInfo.app_secret,
              },
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
            })
            .pipe(map((tokenInfo: Base<accessTokenInfo>) => tokenInfo.data));
        })
      )
      .pipe(
        switchMap((tokeninfo: accessTokenInfo) => {
          sessionStorage.setItem(
            'app_token',
            encodeURIComponent(tokeninfo.token)
          );
          // console.log('c');
          return of(tokeninfo);
        })
      );
  }
}
