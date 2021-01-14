import { Injectable } from '@angular/core';
import {CfhttpService} from "../../../services/cfhttp.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Base} from "../../../types/types";
import {HttpHeaders} from "@angular/common/http";
import {tagList, tagListItem} from "../types";

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
  getTag(params):Observable<any>{
    console.log(params)
   return  this.cfHttp.get('get.tags' ,{
     params:params,
     headers: needToken
   }).pipe(map((res:Base<tagList>)=>res.data));
  }
}
