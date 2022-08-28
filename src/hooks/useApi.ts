import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { get, post, put, del } from '../client/web';

export type UseApiMethod = (
  url: string,
  params?: any,
  headers?: any,
) => Promise<{ ok: boolean; status: number; data: any }>;

export interface UseApiMethods {
  get: UseApiMethod;
  post: UseApiMethod;
  put: UseApiMethod;
  del: UseApiMethod;
}

const parseHeaders = (headers: any = {}, authToken?: string) => {
  if (authToken) {
    headers.authorization = `Bearer ${authToken}`;
  }
  return headers;
};

export function useApi(authToken?: string): UseApiMethods {
  const { basePath } = useRouter();

  return {
    get: useCallback(
      async (url, params, headers) => {
        return get(`${basePath}/api${url}`, params, parseHeaders(headers, authToken));
      },
      [get],
    ),

    post: useCallback(
      async (url, params, headers) => {
        return post(`${basePath}/api${url}`, params, parseHeaders(headers, authToken));
      },
      [post],
    ),

    put: useCallback(
      async (url, params, headers) => {
        return put(`${basePath}/api${url}`, params, parseHeaders(headers, authToken));
      },
      [put],
    ),

    del: useCallback(
      async (url, params, headers) => {
        return del(`${basePath}/api${url}`, params, parseHeaders(headers, authToken));
      },
      [del],
    ),
  };
}

export default useApi;
