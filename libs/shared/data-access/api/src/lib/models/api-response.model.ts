import { type HttpStatusCode } from '@angular/common/http';

export type ApiResponse<T = unknown> = { data: T; error?: ApiError };
export type ApiPaginatedResponse<T = unknown> = ApiResponse<T[]> & {
  totalRecords: number;
};

export type ApiError = {
  code: HttpStatusCode;
  message: string;
};

export type ApiPaginatedRequest<T = unknown> = T & {
  pageSize: number;
  page: number;
  isAscending?: boolean;
  sortingVariable?: string;
};
