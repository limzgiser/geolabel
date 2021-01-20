import { Injectable } from '@angular/core';
import {CfhttpService} from "../../../services/cfhttp.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Base} from "../../../types/types";
import {HttpHeaders} from "@angular/common/http";
import {classifyRootItem, classifyTree} from "../types";


const needToken = new HttpHeaders().set('needToken', 'true');

@Injectable({
  providedIn: 'root'
})
export class ClassifyService {
  constructor(private cfHttp:CfhttpService) {
  }
  // 获取分类根列表
  getRootClassifyList(params):Observable<classifyRootItem[]>{
    return  this.cfHttp.get('classify.root.list' ,{
      params:params,
      headers: needToken
    }).pipe(map((res:Base<classifyRootItem[]>)=>res.data));
  }
  updateRootClassifyList(body):Observable<string>{
    return this.cfHttp.post('update.root.list',body,{
      headers: needToken
    }).pipe(map((res:Base<string>)=>res.data));
  }

  getClassifyTree(params):Observable<classifyTree>{
    return this.cfHttp.get('get.classify.tree',{
      params:params,
      headers: needToken
    }).pipe(map((res:Base<classifyTree>)=>res.data));
  }

  getClassifyNodeDataList(params):Observable<any>{
    return this.cfHttp.get('get.classifyNode.datalist',{
      params:params,
      headers: needToken
    }).pipe(map((res:Base<any>)=>res.data));
  }
  editClassifyNode(body):Observable<any>{
    return this.cfHttp.post('get.classifyNode.datalist',body,{
      headers: needToken
    }).pipe(map((res:Base<any>)=>res.data));
  }
}
