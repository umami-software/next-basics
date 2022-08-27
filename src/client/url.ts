export function removeTrailingSlash(url: string): string {
  return url && url.length > 1 && url.endsWith('/') ? url.slice(0, -1) : url;
}

export function removeWWW(url: string): string {
  return url && url.length > 1 && url.startsWith('www.') ? url.slice(4) : url;
}

export function getQueryString(params: object = {}): string {
  const map = Object.keys(params).reduce((arr: Array<string>, key: string) => {
    if (params[key] !== undefined) {
      return arr.concat(`${key}=${encodeURIComponent(params[key])}`);
    }
    return arr;
  }, []);

  if (map.length) {
    return `?${map.join('&')}`;
  }

  return '';
}

export function makeUrl(url: string, params: object = {}): string {
  return `${url}${getQueryString(params)}`;
}

export function safeDecodeURI(s: string): string {
  try {
    return decodeURI(s);
  } catch (e) {
    console.error(e);
  }
  return s;
}
