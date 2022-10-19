import { buildUrl } from './url';

export function apiRequest(
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

export function get(url: string, params?: object, headers?: object) {
  return apiRequest('get', buildUrl(url, params), undefined, headers);
}

export function del(url, params, headers) {
  return apiRequest('delete', buildUrl(url, params), undefined, headers);
}

export function post(url, params, headers) {
  return apiRequest('post', url, JSON.stringify(params), headers);
}

export function put(url, params, headers) {
  return apiRequest('put', url, JSON.stringify(params), headers);
}
