import { Feature } from '@turf/turf';

export interface NavItem {
  title: string;
  type?: string;
  select: boolean;
  path: string;
  defaultIcon?:string;
  selectIcon?:string;
}



export interface MarkerStatueItem {
  title: string;
  id?: string;
}

export interface drawToolItem {
  label: string;
  type: string;
  defaultImg?: string;
  selectImg?: string;
}

export interface FeatureListItem {
  feature: Feature;
  title: string;
  type: string ;// 'Point' | 'LineString' | 'Polygon';
  des?: string;
  icon?: string;
}
export interface LabelgeoFeature {
   tagid?:string;
  "gid"?:string;
  "title":string;
  "desc": string;
  "geotype": 'Point' | 'LineString' | 'Polygon' | 'MultiLineString'| 'MultiPlygon';
  "geom":  string;
  icon?:string;
}
export interface LabelBaseInfo {
  "title": string;
  "ispublic": number|string;
  "categoryid"?: Array<number|string> | string;
  "taginfos":Array<string> | string;
  "desc": string;
  "geom"?:string;
  "graphs"?:Array<LabelgeoFeature>;
}

export interface soureTagInfo {
  baseInfo:LabelBaseInfo;
  graphs:Array<any>
}

export interface  SearchParams {
  keyWord:string;
  categoryId:string;
  startTime:String;
  endTime:String;
  pageSize:number;
  pageNo:number
}
export  enum tagStatue {
  "MY-PRIVATE",
  "MY-PUBLIC",
  "OHTER-PRIVATE",
  "OHTER-PUBLIC"
}

export interface tagListItem {
  tagid:string;
  title:string;
  issubscribe:0|1;
  status:tagStatue;
  geom:string;
  hidden:boolean
}
export interface  searchTagResult {
  totalRecord:number;
  totalPage:number;
  list:Array<tagListItem>
}

export interface  tagDetailInfo {
  "tagid": string;
  "title":  string;
  "ispublic": number;
  "issubscribe": number;
  "categoryid":  string;
  "categoryname": string|string[];
  "taginfos":  string;
  "desc": string;
  "createby": string;
  "createaccount":  string;
  "createtime":  string;
  "updateby":  string;
  "updateaccount": string;
  "updatetime":  string;
  "geom":  string;
  "isdelete": number;
  "graphCount":number;
  "topicCount":number;
  "graphs"?:LabelgeoFeature[];
}
