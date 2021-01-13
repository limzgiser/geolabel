import {LabelBaseInfo, soureTagInfo} from "../types";
import { parse,stringify } from 'wellknown';
import {cloneDeep} from 'lodash'

/**
 * 标签基础信息表单结构转接口接口
 * @param geo 添加标签中心点
 * @param source 表单结构
 */
export function sourceTagToParams(geo:[number,number],source:soureTagInfo) :LabelBaseInfo{
  let {baseInfo,graphs} = cloneDeep(source);
  baseInfo.categoryid = (baseInfo.categoryid && baseInfo.categoryid.length) ? baseInfo.categoryid [baseInfo.categoryid.length-1] as string:'';
  baseInfo.taginfos = baseInfo.taginfos.toString();
  baseInfo.geo = `Point(${geo[0]} ${geo[1]})` ;
  let feature = [];
    graphs.forEach(item=>{
      feature.push({
        title:item.title,
        desc:item.des,
        geotype:item.type,
        geom:stringify(item.feature)
       });
    });
    baseInfo['graphs'] = feature;
    return baseInfo;
}

/**
 * wkt列表转 geoJson
 * @param wktList
 * @param wktField wkt字段名称
 */
export function listWktToGeoJson(wktList:Array<any>,wktField:string){
  let result = {
    "type": "FeatureCollection",
    features:[]
  };
  if(wktList){
    wktList.forEach((item,index)=>{
      item.index = index.toString();
      let wkt = item[wktField];
      let geometry = parse(wkt);
      delete item[wktField];
      let feature = {
        type:'feature',
        geometry:geometry,
        properties:item
      };
      result.features.push(feature)
    })
  }

  return result;
}
