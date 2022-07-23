export interface IPaginationQuery {
  $rpp?: number;
  $page?: number;
  $orderBy?: Object;
  $filter?: Object;
}

export interface IPageinatedDataTable {
  pages: string;
  total: number;
  data: Object[];
}
