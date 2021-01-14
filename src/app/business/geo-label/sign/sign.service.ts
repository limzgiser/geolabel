import { Injectable } from '@angular/core';
import {CfhttpService} from "../../../services/cfhttp.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Base} from "../../../types/types";
import {HttpHeaders} from "@angular/common/http";
import {searchTagResult, tagDetailInfo} from "../types";

const needToken = new HttpHeaders().set('needToken', 'true');

@Injectable({
  providedIn: 'root'
})
export class SignService {
  constructor(private cfHttp:CfhttpService) {
  }

  /**
   * 添加标记
   * @param body
   */
  addTag(body): Observable<string>{
    return this.cfHttp.post('add.tag',body,{
      headers: needToken
    }).pipe(map((res:Base<string>)=>res.data));
  }
  /**
   * 获取标记列表
   * @param params
   */
  getTagList(params):Observable<searchTagResult>{
   return  this.cfHttp.get('get.tags' ,{
     params:params,
     headers: needToken
   }).pipe(map((res:Base<searchTagResult>)=>res.data));
  }

  /**
   * 查询详情
   * @param params
   */
  getTagDetail(params):Observable<tagDetailInfo>{
    return this.cfHttp.get('get.taginfo',{
      params:params,
      headers: needToken
      }).pipe(map((res:Base<tagDetailInfo>)=>res.data));
  }
  deleteTag(params):Observable<boolean>{
    return this.cfHttp.delete('delete.tag',{
      params:params,
      headers: needToken
    }).pipe(map((res:Base<boolean>)=>res.data));
  }
}
