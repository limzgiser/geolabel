import { Feature } from '@turf/turf';

export interface NavItem {
  title: string;
  type?: string;
  select: boolean;
  path: string;
  defaultIcon?:string;
  selectIcon?:string;
}

export interface ListLabelItem {
  id:string;
  title: string;
  type: string;
  collected: boolean;
  hidden?:boolean,
  wkt:string;
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
  "title":string;
  "desc": string;
  "geotype": 'Point' | 'LineString' | 'Polygon' | 'MultiLineString'| 'MultiPlygon';
  "geom":  string;
}
export interface LabelBaseInfo {
  "title": string;
  "ispublic": number|string;
  "categoryid"?: Array<number|string> | string;
  "taginfos":Array<string> | string;
  "desc": string;
  "geo"?:string;
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
