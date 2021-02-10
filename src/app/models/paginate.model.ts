export interface Paginate<T> {
  page: number;
  size: number;
  total: number;
  data: T[];
}
