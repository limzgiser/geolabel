import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addTagIcon',
})
export class AddTagIconPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    switch (args) {
      case 'Point': // // 'Point' | 'LineString' | 'Polygon';
        return './assets/img/map/icon_detail_point.png';
      case 'LineString':
        return './assets/img/map/icon_detail_line.png';
      case 'Polygon':
        return './assets/img/map/icon_detail_rectangle.png';
      default:
        return './assets/img/map/icon_detail_rectangle.png';
    }
  }
}
