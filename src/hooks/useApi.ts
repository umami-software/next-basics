import { useCallback } from 'react';
import { get, post, put, del, ApiResponse } from 'client/request';

export type ApiMethod = (url: string, params?: any, headers?: any) => Promise<ApiResponse<any>>;

export interface ApiMethods {
  get: ApiMethod;
  post: ApiMethod;
  put: ApiMethod;
  del: ApiMethod;
}

function handleResponse(res: ApiResponse<any>): Promise<ApiResponse<any>> {
  return new Promise((resolve, reject) => {
    if (!res.ok) {
      reject(res.error);
    }
    resolve(res.data);
  });
}

function handleError(err: Error | string) {
  return Promise.reject((err as Error)?.message || err || null);
}

function getUrl(url: string, basePath = ''): string {
  return url.startsWith('http') ? url : `${basePath ?? ''}/api${url}`;
}

export function useApi(authToken?: string, basePath?: string): ApiMethods {
  const updateHeaders = (headers: any = {}) => {
    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }
    return headers;
  };

  return {
    get: useCallback(
      async (url, params, headers) => {
        return get(getUrl(url, basePath), params, updateHeaders(headers))
          .then(handleResponse)
          .catch(handleError);
      },
      [get],
    ),

    post: useCallback(
      async (url, params, headers) => {
        return post(getUrl(url, basePath), params, updateHeaders(headers))
          .then(handleResponse)
          .catch(handleError);
      },
      [post],
    ),

    put: useCallback(
      async (url, params, headers) => {
        return put(getUrl(url, basePath), params, updateHeaders(headers))
          .then(handleResponse)
          .catch(handleError);
      },
      [put],
    ),

    del: useCallback(
      async (url, params, headers) => {
        return del(getUrl(url, basePath), params, updateHeaders(headers))
          .then(handleResponse)
          .catch(handleError);
      },
      [del],
    ),
  };
}

export default useApi;
