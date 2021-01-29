import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
const uri = './assets/config/mapboxmap.config.json';

@Injectable({
  providedIn: 'root'
})
export class MapConfigService  implements Resolve<any> {

  constructor(private http: HttpClient) {}
  resolve(): Observable<any> | Observable<never> {
    return this.http
      .get(uri, {
        headers: {
          'Content-Type': 'application/json',
        },
      }) .pipe(
        switchMap((res: any) => {
          sessionStorage.setItem('map.config', JSON.stringify(res.data));
          return of(res);
        })
      )
  }
}
