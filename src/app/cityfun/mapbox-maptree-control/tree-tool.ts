export   function  addLayers(map,layers) {
    layers.forEach(layerInfo => {

        switch (layerInfo.layer.type) {
            // PT-VTStyle,PT-WMS,PT-WMTS,PT-ESRI-Tile,PT-ESRI-Dynamic
            case "PT-WMS":
            map.addWMSLayer( layerInfo.layer.url,{
                            layerid: layerInfo.aid,
                            layers:  layerInfo.meta.layers
                        }
            );
                break;
        case "PT-ESRI-Dynamic":
            map.addArcGISDynamicLayer( layerInfo.layer.url,{
                            layerid: layerInfo.aid,
                            layers:  layerInfo.meta.layers
                        }
            );
                break;
            default:
                break;
        }
    });
}   

export   function  removeLayers(map,layers,mapboxservice) {
    layers.forEach(layerInfo => {
 
        switch (layerInfo.layer.type) {
            // PT-VTStyle,PT-WMS,PT-WMTS,PT-ESRI-Tile,PT-ESRI-Dynamic
            case "PT-WMS":
            case "PT-ESRI-Dynamic":
            mapboxservice.removeLayerByIds([layerInfo.aid])
                break;
  
            default:
                break;
        }
    });
}   


  
  