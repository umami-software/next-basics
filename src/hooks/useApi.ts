import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { get, post, put, del } from '../client/request';

export type ApiMethod = (
  url: string,
  params?: any,
  headers?: any,
) => Promise<{ ok: boolean; status: number; data: any }>;

export interface ApiMethods {
  get: ApiMethod;
  post: ApiMethod;
  put: ApiMethod;
  del: ApiMethod;
}

export function useApi(): ApiMethods {
  const { basePath } = useRouter();

  return {
    get: useCallback(
      async (url, params, headers) => {
        return get(`${basePath}/api${url}`, params, headers);
      },
      [get],
    ),

    post: useCallback(
      async (url, params, headers) => {
        return post(`${basePath}/api${url}`, params, headers);
      },
      [post],
    ),

    put: useCallback(
      async (url, params, headers) => {
        return put(`${basePath}/api${url}`, params, headers);
      },
      [put],
    ),

    del: useCallback(
      async (url, params, headers) => {
        return del(`${basePath}/api${url}`, params, headers);
      },
      [del],
    ),
  };
}

export default useApi;
