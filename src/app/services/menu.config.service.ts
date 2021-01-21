import { Injectable } from '@angular/core';
import { map, switchMap, take } from 'rxjs/operators';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const uri = './assets/config/menu.config.json';
@Injectable({
  providedIn: 'root',
})
export class MenuConfigService implements Resolve<any> {
  constructor(private http: HttpClient) {}
  resolve(): Observable<any> | Observable<never> {
    return this.http.get(uri, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).pipe(
      switchMap((res: any) => {
        sessionStorage.setItem('menu.config', JSON.stringify(res.data));
        return of(res);
      })
    );
  }
}
