export function getSageNationTagsStyle (layerid,geoSource) {
  return {
    'id': layerid,
      'type': 'symbol',
      'source':  {
      'type':'geojson',
        'data':geoSource
    },
    'layout': {
      'icon-image': layerid,
        'icon-size':1,
        'text-field': ['get','index'],
        'text-font': ['MicrosoftYaHeiRegular'],
        'text-offset': [0, -.3],
        'text-anchor':'center',
        "icon-allow-overlap":true
    },
    'paint': {
      'text-color': '#fff'
    },
  }
}
export function getAllTagsStyle (layerid,geoSource) {
  return {
    'id': layerid,
    'type': 'symbol',
    'source':  {
      'type':'geojson',
      'data':geoSource
    },
    'layout': {
      'icon-image': layerid,
      'icon-size':1,
      //'text-field': ['get','index'],
     // 'text-font': ['MicrosoftYaHeiRegular'],
    //  'text-offset': [0, -.3],
   //   'text-anchor':'center',
      "icon-allow-overlap":true
    },
    'paint': {
     // 'text-color': '#fff'
    },
  }
}
