import { HttpClient, type HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { createApi, fetchBaseQuery } from 'ngrx-rtk-query';
import { Subject, lastValueFrom, takeUntil } from 'rxjs';

import { ENVIRONMENT } from '@card/shared-util-environment';

import { cacher } from '../utils/cache-utils';

const httpClientBaseQuery = fetchBaseQuery((http = inject(HttpClient), environment = inject(ENVIRONMENT)) => {
  return async (args, { signal }) => {
    const {
      url,
      method = 'get',
      headers = undefined,
      body = undefined,
      params = undefined,
      responseHandler = undefined,
    } = typeof args === 'string' ? { url: args } : args;
    const fullUrl = `${environment.baseAPI}${url}`;

    const abortSignalSubject = new Subject<void>();
    const abortSignal$ = abortSignalSubject.asObservable();
    signal.onabort = () => {
      abortSignalSubject.next();
      abortSignalSubject.complete();
    };

    const request$ = http
      .request(method, fullUrl, {
        headers: headers ? new HttpHeaders(headers as Record<string, string>) : undefined,
        body,
        params,
        responseType: responseHandler === 'content-type' ? 'blob' : undefined,
        observe: 'response',
      })
      .pipe(takeUntil(abortSignal$));
    try {
      const response = await lastValueFrom(request$);
      return {
        data: response.body,
        meta: { response, request: response.request },
      };
    } catch (error) {
      return {
        error: {
          status: (error as HttpErrorResponse).status,
          data: (error as HttpErrorResponse).message,
        },
      };
    }
  };
});

export const api = createApi({
  reducerPath: 'api',
  baseQuery: httpClientBaseQuery,
  tagTypes: [...cacher.defaultTags],
  endpoints: (builder) => ({
    refetchErroredQueries: builder.mutation<unknown, void>({
      queryFn: () => ({ data: {} }),
      invalidatesTags: cacher.invalidatesUnknownErrors(),
    }),
  }),
});

export const { useRefetchErroredQueriesMutation, endpoints: apiEndpoints } = api;
