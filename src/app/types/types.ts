export interface Base<T> {
  code: number;
  msg: string;
  data?: T;
}
export interface loginInfo {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}
export interface accessTokenInfo {
  token: string;
  expiresIn?: number;
}

export interface sevItemInfo {
  id: string;
  des?: string;
  url: string;
}
export interface buildTable {
  total: 0;
  rows: [];
}
export interface buildTableItem {
  building_number: number;
  floor_number: number;
  room_number: number;
}
