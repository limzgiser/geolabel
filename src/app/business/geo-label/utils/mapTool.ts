import mapboxgl from 'cityfun-gl';

export enum MarkerStatue {
  none = 0, // 默认状态
  moveing = 1, // 标记移动状态
  editing = 2, // 编辑状态
}
export const event_mousemove_key = 'map-mousemove';
export const event_click_key = 'map-click';
export const event_draw_create = 'draw.create';
export const event_draw_delete= 'draw.delete';
export const event_draw_update= 'draw.update';
export function offMapEvent(
  map: mapboxgl.Map,
  type: string,
  eventKey: string,
  callfuns: {}
): void {
  if (callfuns[eventKey]) {
    map.off(type, callfuns[eventKey]);
  }
}
 