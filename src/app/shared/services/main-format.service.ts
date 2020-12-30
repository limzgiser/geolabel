

import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MainFormatService {
  constructor() { }


  /**
   *扩展数组或字段
   * @param data [] 、{ }
   * @param extFields [[key,value],[key,value]]
   */
  addFields(data, extFields) {
    if (data instanceof Array) {
      data.map(item => {
        extFields.map(jtem => {
          item[jtem[0]] = jtem[1];
        });
      });
    }
    if (typeof data === 'object') {
      extFields.map(jtem => {
        data[jtem[0]] = jtem[1];
      });
    }
    return data;
  }
  /**
    *数据字段适配
    *将字段名称统修改为同一格式，方便数据绑定
    * @param data
    * @param fieldAdaptive  [[ 'ofield1','dfield1'],['ofield2', 'dfield2']]
    */
  fieldAdaptive(data, fieldAdaptive) {
    if (fieldAdaptive.length) {
      for (const item of data) {
        for (const jtem of fieldAdaptive) {
          item[jtem[1]] = item[jtem[0]];
        }
      }
    }
    return data;
  }
  insertActive(data, key, value) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < data.length; i++) {
      if (i === 0) {
        data[i].id = i;
        data[i][key] = true;
      } else {
        data[i].id = i;
        data[i][key] = value;
      }
    }
    return data;
  }
  formate(data, key) {
    for (const item of data) {
      item[key] = Number(item[key]);
    }
    return data;
  }
  /**
   * @param data 原始数据
   * @param extendField
   * 扩展的字段及值 [['okey','ovalue1','dkey','dvalue1'], ['okey','ovalue2','dkey','dvalue2']]
   */
  extendFieldsByfield(data, extendField) {
    if (data instanceof Array) {
      data.map(item => {
        extendField.map(jtem => {
          if (item[jtem[0]] === jtem[1]) {
            item[jtem[2]] = jtem[3];
          }
        });
      });
    }
    return data;
  }


  /**
   *  平台服务解析
   * @param table；
   */
  plantFormDataFormat(table) {
    if (!table) {
      return {};
    }

    return {
      result: _.map(table.tdc, tr => {
        const item = {};
        _.map(tr, td => {
          item[td.did] = td.dv;
        });
        return item;
      }),
      fields: _.map(table.tts, tr => {
        const item = {};
        item['PKey'] = tr.did;
        item['Name'] = tr.tcd;
        return item;
      }),
    }
  }

  /**
   * 数组 ，按照字段展开
   * keepFields  保留字段
   * fields 保留字段
   */
  arraySpreadByFields(data, keepFields, fields) {
    let res = [];
    for (let item of data) {
      for (let jtem of fields) {
        let element = {};
        for (let ktem of keepFields) {
          element[ktem] = item[ktem];
        }
        element[jtem] = item[jtem];
        res.push(element);
      }

    }


    return res;
  }

  /**
   * create html by string
   * @param htmlString
   */
  createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
  }
  /**
   * 返回结果是对象，需要数据为数组，更具数组中item的key，将对象中的value匹配到数组中
   *list  集合
   *obj   对象
   */
  adaptValueByKey(list, obj) {
    for (let item of list) {
      for (let jtem in obj) {
        if (item.key === jtem) {
          item.indexValue = obj[jtem];
          continue;
        }
      }
    }
    return list;
  }

  // 根据服务配置获取服务，支持 多个接口
  // getDataByPath(paths,params?) {
  //   const primises = [];
  //   for (const item of paths) {
  //     primises.push(
  //       this.dataQueryService.dataInquireRequest(item,params).then((res: any) => {
  //         if (res.datas) {
  //           return res.datas;
  //         } else {
  //           return null;
  //         }
  //       })
  //     );
  //   }
  //   return Promise.all(primises);
  // }

  /**
   *
   * @param geojson  空间数据
   * @param list     列表数据
   * @param gfiled   空间数据匹配字段
   * @param lfield   列表数据匹配字段
   */
  geoJSONValueAdaptByList(geojson, list, gfiled, lfield) {
    for (const item of geojson.features) {
      for (const jtem of list) {
        const gString = item.properties[gfiled];
        const lString = jtem[lfield];
        if (gString && lString) {
          if (gString.indexOf(lString) > -1 || lString.indexOf(gString) > -1) {
            item.properties = Object.assign(item.properties, jtem);
            continue;
          }
        }
      }
    }
    return geojson;
  }
  // 归一化geojson
  normalizationGoeJsonField(geojson, field) {
    const maxFeature = _.maxBy(geojson.features, (i) => {
      return Number(i.properties[field]);
    });
    if (maxFeature) {
      geojson.features.forEach(element => {
        element.properties['value'] = Number(element.properties[field]) / Number(maxFeature.properties[field]);
      });
    }

    return geojson;
  }
  // 两个集合适配，将集合2的属性填到集合1中
  doublelistAdapt(list1, list2, filed1, filed2) {
    for (let item of list1) {
      for (let jtem of list2) {
        if (item[filed1] && item[filed2]) {
          if (item[filed1].indexOf(jtem[filed2]) > -1 || jtem[filed1].indexOf(item[filed2]) > -1) {
            item = Object.assign(item, jtem);
            continue;
          }
        }
      }
    }
    return list1;
  }


}
