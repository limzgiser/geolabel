import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addTagIcon',
})
export class AddTagIconPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    switch (args.toLocaleLowerCase()) {
      case 'point': // // 'Point' | 'LineString' | 'Polygon';
        return './assets/img/map/icon_detail_point.png';
      case 'linestring' :
      case 'polyline':
        return './assets/img/map/icon_detail_line.png';
      case 'polygon':
        return './assets/img/map/icon_detail_rectangle.png';
      default:
        return './assets/img/map/icon_detail_rectangle.png';
    }
  }
}
