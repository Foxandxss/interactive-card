import { numberAttribute } from '@angular/core';

import { injectQueryParams } from '@card/shared-data-access-router';

import { type ApiPaginatedRequest, DEFAULT_FIRST_PAGE, DEFAULT_PAGE_SIZE } from '../models';

export const injectCurrentPage = () => injectQueryParams('page', { transform: numberAttribute });

export const injectPaginatedQueryParams = <T extends ApiPaginatedRequest>(initialData: Partial<T> = {}) => {
  const queryParams = injectQueryParams((queryParams) => {
    // Convert boolean strings to boolean
    const fixedValues = Object.entries(queryParams ?? {}).reduce((acc, [key, value]) => {
      if (typeof value === 'string' && (value === 'true' || value === 'false')) {
        return { ...acc, [key]: value === 'true' };
      }
      if (key === 'page' || key === 'pageSize') {
        return { ...acc, [key]: Number(value) };
      }
      return { ...acc, [key]: value };
    }, {} as T);

    return {
      ...initialData,
      ...fixedValues,
      page: Number(fixedValues['page'] ?? initialData.page ?? DEFAULT_FIRST_PAGE),
      pageSize: Number(fixedValues['pageSize'] ?? initialData.pageSize ?? DEFAULT_PAGE_SIZE),
    } satisfies ApiPaginatedRequest as T;
  });

  return queryParams;
};
