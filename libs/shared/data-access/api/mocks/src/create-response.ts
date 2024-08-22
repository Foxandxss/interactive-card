import { HttpStatusCode } from '@angular/common/http';
import { HttpResponse } from 'msw';

import {
  type ApiError,
  type ApiPaginatedRequest,
  type ApiPaginatedResponse,
  type ApiResponse,
  DEFAULT_FIRST_PAGE,
  DEFAULT_PAGE_SIZE,
} from '@card/shared-data-access-api';

export const apiResponse = <T = unknown>(data: T) => {
  const response: ApiResponse = { data };
  return HttpResponse.json(response);
};

export const apiPaginatedResponse = <T = unknown>({
  data,
  page,
  pageSize,
  sortingVariable,
  isAscending,
}: { data: T[] } & ApiPaginatedRequest) => {
  const sortedData = sortingVariable
    ? (([...data] as Record<string, unknown>[]).sort((a, b) => {
        if (isAscending) return (a[sortingVariable] as string) > (b[sortingVariable] as string) ? 1 : -1;
        return (a[sortingVariable] as string) < (b[sortingVariable] as string) ? 1 : -1;
      }) as T[])
    : data;

  const paginatedData = sortedData.slice((page - 1) * pageSize, page * pageSize);

  const response: ApiPaginatedResponse<T> = {
    data: paginatedData,
    totalRecords: data.length,
  };
  return HttpResponse.json(response);
};

export const apiEmptyDataResponse = <T = unknown>() => {
  return apiPaginatedResponse<T>({
    data: [] as T[],
    page: DEFAULT_FIRST_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
  });
};

export const apiErrorResponse = (error: ApiError) => {
  const response: ApiResponse = { error, data: undefined };
  return HttpResponse.json(response, { status: error.code });
};

export const apiNotFoundErrorResponse = () => {
  return apiErrorResponse({
    code: HttpStatusCode.NotFound,
    message: 'Not found',
  });
};

export const apiNotControlledErrorResponse = () => {
  return apiErrorResponse({
    code: HttpStatusCode.InternalServerError,
    message: 'Internal Server Error',
  });
};
