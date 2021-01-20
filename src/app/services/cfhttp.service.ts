import { Observable, Observer } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {map, filter, switchMap, take, debounce, delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CfhttpService {
  sevConfig = null;
  sevCfgURL :string= '';
  serviceCOnfigHttp$ = null;
  constructor(private http: HttpClient) {
    this.sevCfgURL = JSON.parse(sessionStorage.getItem('main.config'))['service.config'];
  }
  /**
   * 服务配置文件
   */
  getSevConfig(): Observable<any> {
    if (this.sevConfig) {
      return of(this.sevConfig);
    } else {
        return  this.http.get(this.sevCfgURL).pipe(
          map((res: any) => {
            this.sevConfig = res;
            return res;
          })
        );
    }
  }
  /**
   *
   * @param sevid;
   */
  get(serverId, options?: any): Observable<any> {

    return this.getSevConfig().pipe(
      map((data: any) => {
        let item = data.list.find((item) => item.id === serverId);
        if(!item){
          throw new Error(`${serverId}未配置服務`);
        }
        let url = this.getFullUrl(item.url, this.sevConfig.host);
        return url;
      }),
      switchMap((url: string) => {
        return this.http.get(url, options);
      })
    );
  }
  /**
   *
   * @param sevid;
   */
  post(serverId, body, options?: any): Observable<any> {
    return this.getSevConfig().pipe(
      map((data: any) => {
        let item = data.list.find((item) => item.id === serverId);
        if(!item){
          throw new Error(`${serverId}未配置服務`);
        }
        let url = this.getFullUrl(item.url, this.sevConfig.host);
        return url;
      }),
      switchMap((url: string) => {
        return this.http.post(url, body, options);
      })
    );
  }
  /**
   *
   * @param sevid;
   */
  delete(serverId, body): Observable<any> {
    return this.getSevConfig().pipe(
      map((data: any) => {
        let item = data.list.find((item) => item.id === serverId);
        if(!item){
          throw new Error(`${serverId}未配置服務`);
        }
        let url = this.getFullUrl(item.url, this.sevConfig.host);
        return url;
      }),
      switchMap((url: string) => {
        return this.http.delete(url, body);
      })
    );
  }
  getFullUrl(url, hostdata) {
    if (url.indexOf('}}') > -1) {
      let urls = url.split('}}');
      let host = urls[0].split('{{')[1];
      let resHost = hostdata['{{' + host + '}}'];
      return resHost + urls[1];
    } else {
      return url;
    }
  }
}
