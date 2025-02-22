export interface iPageable {
  pageNumber: number;
  pageSize: number;
  sort: iSort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

export interface iSort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export interface iSort2 {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}
