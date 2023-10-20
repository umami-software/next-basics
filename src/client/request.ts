import { buildUrl } from './url';

export async function request(
  method: string,
  url: string,
  body: string | undefined,
  headers: object = {},
): Promise<{ ok: boolean; status: number; data?: any; error?: any }> {
  const res = await fetch(url, {
    method,
    cache: 'no-cache',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    body,
  });
  if (res.ok) {
    return res.json().then(data => ({ ok: res.ok, status: res.status, data }));
  }

  const text = await res.text();

  return { ok: res.ok, status: res.status, error: text };
}

export function httpGet(url: string, params: object = {}, headers: object = {}) {
  return request('get', buildUrl(url, params), undefined, headers);
}

export function httpDelete(url: string, params: object = {}, headers: object = {}) {
  return request('delete', buildUrl(url, params), undefined, headers);
}

export function httpPost(url: string, params: object = {}, headers: object = {}) {
  return request('post', url, JSON.stringify(params), headers);
}

export function httpPut(url: string, params: object = {}, headers: object = {}) {
  return request('put', url, JSON.stringify(params), headers);
}
