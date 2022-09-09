import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { get, post, put, del } from '../client/request';

export type ApiResponse = { ok: boolean; status: number; data?: any; error?: any };

export type ApiMethod = (url: string, params?: any, headers?: any) => Promise<ApiResponse>;

export interface ApiMethods {
  get: ApiMethod;
  post: ApiMethod;
  put: ApiMethod;
  del: ApiMethod;
}

function handleError(res: ApiResponse): Promise<ApiResponse> {
  return new Promise((resolve, reject) => {
    if (!res.ok) {
      reject(res.error);
    }
    resolve(res.data);
  });
}

export function useApi(authToken): ApiMethods {
  const { basePath } = useRouter();

  const updateHeaders = (headers: any = {}) => {
    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }
    return headers;
  }

  return {
    get: useCallback(
      async (url, params, headers) => {
        return get(`${basePath}/api${url}`, params, updateHeaders(headers)).then(handleError);
      },
      [get],
    ),

    post: useCallback(
      async (url, params, headers) => {
        return post(`${basePath}/api${url}`, params, updateHeaders(headers)).then(handleError);
      },
      [post],
    ),

    put: useCallback(
      async (url, params, headers) => {
        return put(`${basePath}/api${url}`, params, updateHeaders(headers)).then(handleError);
      },
      [put],
    ),

    del: useCallback(
      async (url, params, headers) => {
        return del(`${basePath}/api${url}`, params, updateHeaders(headers)).then(handleError);
      },
      [del],
    ),
  };
}

export default useApi;
