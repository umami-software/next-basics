import { buildUrl } from './url';

export const apiRequest = (method: string, url: string, body, headers?: object) => {
  return fetch(url, {
    method,
    cache: 'no-cache',
    credentials: 'same-origin',
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

    return res.text().then(data => ({ ok: res.ok, status: res.status, res: res, data }));
  });
};

export const get = (url: string, params?: object, headers?: object) =>
  apiRequest('get', buildUrl(url, params), undefined, headers);

export const del = (url, params, headers) =>
  apiRequest('delete', buildUrl(url, params), undefined, headers);

export const post = (url, params, headers) =>
  apiRequest('post', url, JSON.stringify(params), headers);

export const put = (url, params, headers) =>
  apiRequest('put', url, JSON.stringify(params), headers);
