import { buildUrl } from './url';

export function request(
  method: string,
  url: string,
  body,
  headers?: object,
): Promise<{ ok: boolean; status: number; data?: any; error?: any }> {
  return fetch(url, {
    method,
    cache: 'no-cache',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    body,
  }).then(res => {
    if (res.ok) {
      return res.json().then(data => ({ ok: res.ok, status: res.status, data }));
    }

    return res.text().then(text => ({ ok: res.ok, status: res.status, error: text }));
  });
}

export function httpGet(url: string, params?: object, headers?: object) {
  return request('get', buildUrl(url, params), undefined, headers);
}

export function httpDelete(url, params, headers) {
  return request('delete', buildUrl(url, params), undefined, headers);
}

export function httpPost(url, params, headers) {
  return request('post', url, JSON.stringify(params), headers);
}

export function httpPut(url, params, headers) {
  return request('put', url, JSON.stringify(params), headers);
}
