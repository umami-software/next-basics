import { makeUrl } from './url';

export const apiRequest = (method, url, body, headers) => {
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

export const get = (url, params, headers) =>
  apiRequest('get', makeUrl(url, params), undefined, headers);

export const del = (url, params, headers) =>
  apiRequest('delete', makeUrl(url, params), undefined, headers);

export const post = (url, params, headers) =>
  apiRequest('post', url, JSON.stringify(params), headers);

export const put = (url, params, headers) =>
  apiRequest('put', url, JSON.stringify(params), headers);
