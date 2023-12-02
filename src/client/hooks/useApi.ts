import { useCallback } from 'react';
import { httpGet, httpPost, httpPut, httpDelete } from 'client/request';

export type ApiResponse = { ok: boolean; status: number; data?: any; error?: any };

export type ApiMethod = (
  url: string,
  params?: { [key: string]: any },
  headers?: { [key: string]: string },
) => Promise<any>;

export interface ApiMethods {
  get: ApiMethod;
  post: ApiMethod;
  put: ApiMethod;
  del: ApiMethod;
}

function handleResponse(res: ApiResponse): Promise<any> {
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
  return url.startsWith('http') ? url : `${basePath}/api${url}`;
}

export function useApi<T>(defaultHeaders?: any, basePath?: string): ApiMethods {
  const getHeaders = (headers: any = {}) => {
    return { ...defaultHeaders, ...headers };
  };

  return {
    get: useCallback(
      async (url, params, headers) => {
        return httpGet(getUrl(url, basePath), params, getHeaders(headers))
          .then(handleResponse)
          .catch(handleError);
      },
      [httpGet],
    ),

    post: useCallback(
      async (url, params, headers) => {
        return httpPost(getUrl(url, basePath), params, getHeaders(headers))
          .then(handleResponse)
          .catch(handleError);
      },
      [httpPost],
    ),

    put: useCallback(
      async (url, params, headers) => {
        return httpPut(getUrl(url, basePath), params, getHeaders(headers))
          .then(handleResponse)
          .catch(handleError);
      },
      [httpPut],
    ),

    del: useCallback(
      async (url, params, headers) => {
        return httpDelete(getUrl(url, basePath), params, getHeaders(headers))
          .then(handleResponse)
          .catch(handleError);
      },
      [httpDelete],
    ),
  };
}

export default useApi;
