import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ModuleDataRxInquireService } from "@cmss/core";
import * as  mapboxgl from 'mapbox-gl';
import { mapTo, delay } from 'rxjs/operators';
import { cursorType } from "./mapboxTypes";
// mapboxgl.srid = 4326;   // 4326 or 3857

@Injectable({
  providedIn: "root",
})
export class MapboxmapService {

  styleinit = false;

  specialStyel = null;

  mapboxmap = null;
  firstFullLoaded = false;
  constructor(
    private http: HttpClient,
    private dataRxInquireService: ModuleDataRxInquireService
  ) {
    this.init().then((res) => {
      console.log("地图创建完成");
      this.mapboxmap.on("load", () => {
        console.log("样式加载完成");
        this.addSplieGroupLayer();
      });
    });
  }
  /**
   * 底图初始化、单例创建地图、加载专题图配置文件
   */
  init() {
    let self = this;
    if (this.mapboxmap || this.specialStyel) {
      return new Promise((resolve, reject) => {
        resolve(this.mapboxmap);
      });
    } else {
      return Promise.all([
        this.getBaseMapStyle().then((style_base: any) => {
          return this.createSpMap(style_base);
        }),
        this.getSpecialMapStyle().then((style_special: any) => {
          self.specialStyel = style_special;
          return style_special; //
        }),
      ]).then((res) => {
        return res[0];
      });
    }
  }
  /**
   * 默认添加三个图层组合，用来控制添加专题图层顺序
   */
  private addSplieGroupLayer() {
    this.mapboxmap.addLayer({
      id: "sp-layer-fill",
      type: "fill",
      source: {
        type: "geojson",
        data: null,
      },
    });
    this.mapboxmap.addLayer({
      id: "sp-layer-line",
      type: "line",
      source: {
        type: "geojson",
        data: null,
      },
    });
    this.mapboxmap.addLayer({
      id: "sp-layer-point",
      type: "symbol",
      source: {
        type: "geojson",
        data: null,
      },
    });
    this.mapboxmap.addLayer({
      id: "sp-layer-hot",
      type: "heatmap",
      source: {
        type: "geojson",
        data: null,
      },
    });
  }

  /**
   *
   * 获取图层beforeid
   * @param type  图层类型
   */
  public getBeforeLayerIdByLayerType(type) {
    if (type === "symbol" || type === "circle") {
      return "";
    }
    if (type === "line") {
      return "sp-layer-line";
    } else if (type === "heatmap") {
      return "sp-layer-hot";
    } else {
      return "sp-layer-fill";
    }
  }
  /**
   * 获取底图样式配置文件
   */
  private getBaseMapStyle() {
    // return this.http
    //   .get(this.base_map_style)
    //   .toPromise()
    //   .catch(err => {
    //     console.log(err);
    //   });
    //
    return this.dataRxInquireService.get("mapboxmap", "base.map").toPromise();
  }
  /**
   * 获取专题图样式配置文件
   */
  private getSpecialMapStyle() {
    // return this.http
    //   .get(this.special_map_style)
    //   .toPromise()
    //   .catch(err => {
    //     console.log(err);

    //   });
    return this.dataRxInquireService.get("mapboxmap", "special.map", null, null).toPromise();
  }

  /**
   *
   * @param style  创建地图
   */
  private createSpMap(style) {
    let self = this;
    return new Promise((resolve, reject) => {
      if (this.mapboxmap) {
        resolve(this.mapboxmap);
      } else {
        let tmpstyle = {
          container: "mapboxmap",
          style: style,
          // minZoom: 14,
          // "center": [120.715107, 31.159329],
          // pitch: 53.99999999999998,
          // bearing: -8.000000000000115,
        };
        self.mapboxmap = new mapboxgl.Map(tmpstyle);

        self.mapboxmap.on('load', () => {
          this.firstFullLoaded = true;
        });

        resolve(self.mapboxmap);
      }
    });
  }

  public resetExtent(options?) {
    let style = this.mapboxmap.getStyle();
    if (options) {
      this.mapboxmap.flyTo(options);
    } else {
      this.mapboxmap.flyTo({
        center: style.center,
        zoom: style.zoom,
        bearing: style.bearing || 0,
      });
    }
  }
  /**
   * 获取地图
   */
  public getMap() {
    return this.mapboxmap;
  }

  public setCursor(type:cursorType){
    const canvas = this.mapboxmap.getCanvas();
    canvas.style.cursor = type || '';
  }

  /**
   * 定位到目标
   */
  public setFlyTo(options) {
    this.mapboxmap.flyTo(options);
  }

  /**
   * 设置Pitch
   * @param num
   * @param options
   */
  public setPitch(num, options?) {
    this.mapboxmap.setPitch(num, options);
  }
  /**
   * 移除marker
   */
  public removeMarker(marker) {
    marker.remove();
  }
  /**
   * 设置bear
   */
  public setBearing(num) {
    this.mapboxmap.setBearing(num);
  }
  /**
   * 图层 id 数组
   * @param layerids
   */
  public removeLayerByIds(layerids: Array<string>, rimg = true) {
    if (this.mapboxmap) {
      for (let id of layerids) {
        // console.log(999, layerids);
        if (this.mapboxmap.getLayer(id)) {
          this.mapboxmap.removeLayer(id);
        }
        if (this.mapboxmap.getSource(id)) {
          this.mapboxmap.removeSource(id);
        }
        if (this.mapboxmap.hasImage(id) && rimg) {
          this.mapboxmap.removeImage(id);
        }
      }
    }
  }
  /**
   *
   * @param style  geojson  数据源 图层样式
   * @param options  beforeIds
   */
  public addGeoJSONLayer(style: any, options: any) {
    this.removeLayerByIds([style.id]);
    if (options.beforeId) {
      this.mapboxmap.addLayer(style, options.beforeId);
    } else {
      const defaultBeforeid = this.getBeforeLayerIdByLayerType(style.type);
      // sp-layer-point
      if (defaultBeforeid) {
        this.mapboxmap.addLayer(style, defaultBeforeid);
      } else {
        this.mapboxmap.addLayer(style);
      }
    }
  }
  /**
   * 添加地图气泡，marker
   * @param options
   * @param coordinates
   */
  public addMarker(options, coordinates) {
    return new mapboxgl.Marker(options)
      .setLngLat(coordinates)
      .addTo(this.mapboxmap);
  }
  /**
   *
   * @param style  图层样式
   * @param options  { beforeId }
   */
  public addSymbolLayer(style: any, options: any) {
    const imgurl = options.img;
    const imgid = style.id;
    const ispath = imgurl.match(/\.(jpeg|jpg|gif|png)$/); // 图片地址路径
    if (this.mapboxmap.hasImage(imgid)) {
      this.removeLayerByIds([imgid]);
    }
    if (ispath) {
      this.mapboxmap.loadImage(imgurl, (error, image) => {
        if (!image) {
          console.log("加载图片资源出错", imgurl);
          return;
        }
        if (this.mapboxmap.hasImage(imgid)) {
          this.mapboxmap.removeImage(imgid);
        }
        this.mapboxmap.addImage(imgid, image);
        if (options.beforeId) {
          this.mapboxmap.addLayer(style, options.beforeId);
        } else {
          this.mapboxmap.addLayer(style);
        }
      });
    } else {
      if (options.beforeId) {
        this.mapboxmap.addLayer(style, options.beforeId);
      } else {
        this.mapboxmap.addLayer(style);
      }
    }
  }
  /**
   * 部件
   */
  addFittings(layerids, fittingsstyles, options?) {
    if (Array.isArray(layerids)) {
      // console.log('layerids', layerids);
      layerids.forEach((obj) => {
        if (fittingsstyles) {
          const layer = fittingsstyles.find((layer: any) => {
            return layer.id === obj.layerKey;
          });
          // console.log(layer, fittingsstyles);
          if (layer) {
            //  console.log(layer);
            this.mapboxmap.addLayer(layer.lyrStyle);
          } else {
            console.log(`没有配置ID为 ${obj.layerKey} 的专题图!`);
          }
        } else {
          console.log("专题图层配置文件未加载!");
        }
      });
    } else {
      if (fittingsstyles) {
        const layer = fittingsstyles.find((layer: any) => {
          return layer.id === layerids;
        });
        if (layer) {
          // console.log(999, layer.lyrStyle);
          this.mapboxmap.addLayer(layer.lyrStyle);
        }
      }
    }
  }

  /**
   * 使用专题图层ID 加载 专题图层
   * @param layerids 专题图层ID数组
   */
  public addThematicLayerByIds(layerids, options?) {
    if (Array.isArray(layerids)) {
      layerids.forEach((id) => {
        if (this.specialStyel) {
          const layer = this.specialStyel.layers.find((layer: any) => {
            return layer.id === id.urlid;
          });
          if (layer) {
            if (this.specialStyel.sources[layer.source]) {
              const layersource = this.mapboxmap.getSource(layer.source);
              // console.log('layersource', layersource);
              this.removeLayerByIds([layer.id], false);
              if (!layersource) {
                this.mapboxmap.addSource(
                  layer.source,
                  this.specialStyel.sources[layer.source]
                );
              }
              if (options && options.beforeId) {
                // symbol  imagesource 是不是在


                this.addImage(layer, id.imageUrl).then(res => {

                  this.mapboxmap.addLayer(layer, options.beforeId);
                });

              } else {
                const defaultBeforeid = this.getBeforeLayerIdByLayerType(
                  layer.type
                );
                this.addImage(layer, id.imageUrl).then(res => {
                  this.mapboxmap.addLayer(layer, defaultBeforeid);
                });
              }
            } else {
              console.log(`没有配置ID为 ${id} 的专题图 对应的数据源!`);
            }
          } else {
            console.log(`没有配置ID为 ${id} 的专题图!`);
          }
        } else {
          console.log('专题图层配置文件未加载!');
        }
      });
    }
  }
  private addImage(layer, imgurl) {

    return new Promise((r, j) => {
      if (layer.type === 'symbol' && !this.mapboxmap.hasImage(layer.layout['icon-image'])) {
        //   console.log(12, imgurl);
        this.mapboxmap.loadImage(imgurl, (error, image) => {
          if (!image) {
            console.log("加载专题图片资源出错");
            j('加载专题图片资源出错');
            return;
          } else {
            this.mapboxmap.addImage(layer.layout['icon-image'], image);
            r('添加图片资源成功!');
          }
        });
      } else {
        r('不是symbol图层或已加载symbol图标资源');
      }
    });
  }
  /**
   * symbol 扩散效果
   * @param style
   * @param options
   */
  public addSymbolDiffusionLayer(style, options) {
    const size = options.size;
    const duration = options.duration;
    // 填充rgba字符串
    const fillRgbaStr = this.hexToRgba(options.fcolor, options.fopacity || 1);
    // 填充rgb对象 {r,g,b}
    const fillRgbObj = this.getRGB(fillRgbaStr);
    const fillOpacity = options.fopacity;
    const strokRgbaStr = this.hexToRgba(options.scolor, options.sopacity || 1);
    // 填充rgb对象 {r,g,b}
    const strokRgbObj = this.getRGB(strokRgbaStr);
    const strokOpacity = options.sopacity;
    const lineWidth = options.lineWidth;
    let canvasContext = null;
    const pulsingDot = {
      width: size,
      height: size,
      data: new Uint8Array(size * size * 4),
      onAdd: () => {
        canvasContext = this.createCanvas(size, size).getContext("2d");
      },
      render: () => {
        const t = (performance.now() % duration) / duration;
        const radius = (size / 2) * 0.3;
        const outerRadius = (size / 2) * 0.7 * t + radius;
        const context = canvasContext;
        context.clearRect(0, 0, size, size);
        // 外圈
        context.beginPath();
        context.arc(size / 2, size / 2, outerRadius, 0, Math.PI * 2);
        context.fillStyle = `rgba(  ${fillRgbObj.r},  ${fillRgbObj.g},${fillRgbObj.b
          }, ${fillOpacity - t})`;
        context.fill();
        // 内圈
        context.beginPath();
        context.arc(size / 2, size / 2, outerRadius / 2, 0, Math.PI * 2);
        context.fillStyle = `rgba(  ${fillRgbObj.r},  ${fillRgbObj.g},${fillRgbObj.b
          }, ${fillOpacity - t})`;
        context.lineWidth = lineWidth;
        context.stroke();

        // 外圈边线
        context.beginPath();
        context.arc(size / 2, size / 2, outerRadius, 0, Math.PI * 2);

        context.strokeStyle = `rgba(  ${strokRgbObj.r},  ${strokRgbObj.g},${strokRgbObj.b
          }, ${strokOpacity - t})`;
        context.lineWidth = lineWidth;
        context.stroke();
        pulsingDot.data = context.getImageData(0, 0, size, size).data;
        this.mapboxmap.triggerRepaint();
        return true;
      },
    };
    this.removeLayerByIds([style.id]);
    this.mapboxmap.addImage(style.id, pulsingDot, { pixelRatio: 2 });
    this.mapboxmap.addLayer(style);
  }

  /**
   * 轨迹
   * @param source  数据源-轨迹点-geojson
   * @param historyStyle
   * @param timingStyle
   * @param options
   */
  public addHisSingleTrackLayer(
    sourceData,
    histPointStyle,
    histLineStyle,
    options
  ) {
    // 过滤停止点，保留一个停止点
    const filterStopPoint = { type: "FeatureCollection", features: [] };
    // 历史轨迹线
    const lineString = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [],
          },
        },
      ],
    };
    for (const feature of sourceData.features) {
      if (filterStopPoint.features.length === 0) {
        filterStopPoint.features.push(feature);
        lineString.features[0].geometry.coordinates.push(
          feature.geometry.coordinates
        );
      } else {
        if (
          filterStopPoint.features[filterStopPoint.features.length - 1]
            .properties[options.speedkey] === 0 &&
          feature.properties[options.speedkey] === 0
        ) {
          continue;
        } else {
          filterStopPoint.features.push(feature);
          lineString.features[0].geometry.coordinates.push(
            feature.geometry.coordinates
          );
        }
      }
    }
    histPointStyle.source.data = filterStopPoint;

    this.addGeoJSONLayer(histPointStyle, {});
    histLineStyle.source.data = lineString;

    this.addGeoJSONLayer(histLineStyle, {});
  }
  /**
   * 创建画布
   * @param width
   * @param height
   */
  private createCanvas(width, height) {
    let canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }
  /**
   * 颜色16进制转rgb(16进制非简写)
   * @param hex
   * @param opacity
   */
  private hexToRgba(hex, opacity) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return `rgba(${parseInt(result[1], 16)},${parseInt(
      result[2],
      16
    )},${parseInt(result[3], 16)}, ${opacity})`;
  }
  /**
   * 提取rgb数字 only rgb no a
   * @param rgbstr
   */
  private getRGB(rgbstr) {
    let match = rgbstr.match(
      /rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/
    );
    return match
      ? {
        r: match[1],
        g: match[2],
        b: match[3],
      }
      : {};
  }
  // 移除地图
  removeBaseLayer() {
    const baseStyleJson = this.mapboxmap.getStyle();
    const removeLayers = [];
    for (let item of baseStyleJson.layers) {
      if (item.id === 'sp-layer-fill') {
        break;
      }
      removeLayers.push(item);
    }
    // console.log(removeLayers)
    const removeSource = new Set();
    for (const layer of removeLayers) {
      // "sp-layer-hot";"sp-layer-fill";"sp-layer-line"; "sp-layer-point";'

      // if (/^(sp-layer-)/.test(layer.id)) {
      //   continue;
      // }
      if (this.mapboxmap.getLayer(layer.id)) {
        this.mapboxmap.removeLayer(layer.id);
        removeSource.add(layer.source);
      }
    }
    Array.from(removeSource).forEach(key => {
      if (this.mapboxmap.getSource(key)) {
        this.mapboxmap.removeSource(key);
      }
    });

  }
  createCavans(width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }
  // 添加精灵图资源
  addImages(spritePath) {
    const self = this;
    this.http.get(`${spritePath}.json`).toPromise().then(spriteJson => {
      const img = new Image();
      img.onload = function () {
        Object.keys(spriteJson).forEach(key => {
          const spriteItem = spriteJson[key];
          const { x, y, width, height } = spriteItem;
          const canvas = self.createCavans(width, height);
          const context = canvas.getContext('2d');
          context.drawImage(img, x, y, width, height, 0, 0, width, height);
          // 单位雪碧图项，转base64字符串
          const base64Url = canvas.toDataURL('image/png');
          self.mapboxmap.loadImage(base64Url, (error, simg) => {
            if (!self.mapboxmap.hasImage(key)) {
              self.mapboxmap.addImage(key, simg);
            }
          });
        });
      };
      img.crossOrigin = "anonymous";
      img.src = `${spritePath}.png`;
    });
  }
  // 添加一整张底图
  addMapStyle(styleUrl, option?) {
    const self = this;
    return this.http.get(styleUrl)
      // .pipe(delay(1000))
      .
      subscribe((styleJson: any) => {
        Object.keys(styleJson.sources).forEach(key => {
          if (!this.mapboxmap.getSource(key)) {
            self.mapboxmap.addSource(key, styleJson.sources[key]);
          }
        });
        if (styleJson.sprite) {
          this.addImages(styleJson.sprite);
        }
        for (const layer of styleJson.layers) {
          let layerid = layer.id;
          if (option && option.idbeg) {
            layerid = option.idbeg + layerid;
            layer.id = layerid;
          }
          if (!self.mapboxmap.getLayer(layerid)) {
            if (option && option.baseMap) {
              self.mapboxmap.addLayer(layer, 'sp-layer-fill');
            } else {
              self.mapboxmap.addLayer(layer);
            }
          }
        }
        if (option && option.zoom) {
          const { center, pitch, bearing, zoom } = styleJson;
          this.mapboxmap.flyTo({
            center: center,
            zoom: zoom,
            pitch: pitch,
            bearing: bearing,
            speed: 0.5
          });
        }
      });
  }
  // 根据图层id，移除图层，以id 开头
  removeLayerByBegId(begid) {
    const baseStyleJson = this.mapboxmap.getStyle();
    for (let item of baseStyleJson.layers) {
      if (item.id.startsWith(begid)) {
        this.removeLayerByIds([item.id]);
      }
    }
  }

}
