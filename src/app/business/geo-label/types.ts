import { Feature } from '@turf/turf';

export interface NavItem {
  title: string;
  type?: string;
  select: boolean;
  path: string;
  defaultIcon?:string;
  selectIcon?:string;
}

export interface labelItem {
  title: string;
  type: string;
  collected: boolean;
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
  "categoryid": number|string;
  "taginfos":string;
  "desc": string;
  "geoms":Array<LabelgeoFeature>
}
