export interface NavItem {
  title: string;
  type?: string;
  select: boolean;
  path: string;
}

export interface labelItem {
  title: string;
  type: string;
  collected: boolean;
}

export interface MarkerStatueItem {
  title: string;
  id?: string;
}
