import { Injectable } from '@angular/core';
import {CfhttpService} from "../../../services/cfhttp.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Base} from "../../../types/types";
import {HttpHeaders} from "@angular/common/http";

const needToken = new HttpHeaders().set('needToken', 'true');

@Injectable({
  providedIn: 'root'
})
export class SignService {
  constructor(private cfHttp:CfhttpService) {
  }
  addTag(body): Observable<boolean>{
    return this.cfHttp.post('add.tag',body,{
      headers: needToken
    }).pipe(map((res:Base<boolean>)=>res.data));
  }
  getTag():Observable<any>{
   return  this.cfHttp.get('get.tags').pipe(map((res:any)=>res.data));
  }
}
