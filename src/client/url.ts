export function makeUrl(url: string, params: object = {}): string {
  const queryString = new URLSearchParams({ ...params }).toString();

  return `${url}${queryString && '?' + queryString}`;
}

export function safeDecodeURI(s: string): string {
  try {
    return decodeURI(s);
  } catch (e) {
    console.error(e);
  }
  return s;
}
