import {LabelBaseInfo, soureTagInfo} from "../types";
import { parse,stringify } from 'wellknown';
import {cloneDeep} from 'lodash'
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
