import { Injectable } from '@angular/core';
import {CfhttpService} from "../../../services/cfhttp.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Base} from "../../../types/types";

@Injectable({
  providedIn: 'root'
})
export class SignService {

  constructor(private cfHttp:CfhttpService) {

  }
  addTag(body): Observable<boolean>{
    return this.cfHttp.post('add.tag',body).pipe(map((res:Base<boolean>)=>res.data));
  }
}
