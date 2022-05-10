export interface IPaginationQuery {
  $rpp?: number;
  $page?: number;
  $orderBy: Object;
  $filter: Object;
}
export interface IForecastQuery {
  $userId: string;
  $timeStamp: string;
}
export interface IPageinatedDataTable {
  pages: string;
  total: number;
  data: Object[];
}
export interface IImage {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}
export interface ICoordinates {
  lat: number;
  long: number;
}
