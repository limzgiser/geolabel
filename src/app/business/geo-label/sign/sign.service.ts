import { Injectable } from '@angular/core';
import {CfhttpService} from "../../../services/cfhttp.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Base} from "../../../types/types";
import {HttpHeaders} from "@angular/common/http";
import {classifyTree, searchTagResult, tagDetailInfo, tagListItem} from "../types";

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
   * 编辑
   * @param body
   */
  editTag(body): Observable<string>{
    return this.cfHttp.post('edit.tag',body,{
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
  getAllTagListPoint(params):Observable<tagListItem[]>{
    return  this.cfHttp.get('get.tags' ,{
      params:params,
      headers: needToken
    }).pipe(map((res:Base<Array<tagListItem>>)=>res.data));
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

  /**
   * 删除标签
   * @param params
   */
  deleteTag(params):Observable<boolean>{
    return this.cfHttp.delete('delete.tag',{
      params:params,
      headers: needToken
    }).pipe(map((res:Base<boolean>)=>res.data));
  }
  /**
   *  切换收藏
   * @param params
   */
   toggleSub(body):Observable<number>{
    return this.cfHttp.post('toggle.sub',body,{
      headers: needToken
    }).pipe(map((res:Base<number>)=>res.data));
  }
  /**
   *  获取分类树
   * @param params
   */
  getClassifyTree(params):Observable<classifyTree>{
    return this.cfHttp.get('classify.tree',{
      params:params,
      headers: needToken
    }).pipe(map((res:Base<classifyTree>)=>res.data));
  } 

   /**
   * 获取收藏列表
   * @param params
   */
  getCollectList(params):Observable<searchTagResult>{
    return  this.cfHttp.get('collect.list' ,{
      params:params,
      headers: needToken
    }).pipe(map((res:Base<searchTagResult>)=>res.data));
   }
   getAllCollecPoint(params):Observable<tagListItem[]>{
    return  this.cfHttp.get('collect.list' ,{
      params:params,
      headers: needToken
    }).pipe(map((res:Base<Array<tagListItem>>)=>res.data));
  }

  getCommandList(params):Observable<any>{
    return  this.cfHttp.get('get.comment.list' ,{
      params:params,
      headers: needToken
    }).pipe(map((res:Base<Array<any>>)=>res.data));
  }

  makeCommand(body):Observable<any>{
    return  this.cfHttp.post('make.comment' ,body,{

      headers: needToken
    }).pipe(map((res:Base<Array<any>>)=>res.data));
  }
  deleteCommand(body):Observable<any>{
    return  this.cfHttp.post('delete.comment' ,body,{
      headers: needToken
    }).pipe(map((res:Base<Array<any>>)=>res.data));
  }
}
