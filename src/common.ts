const CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function getRandomChars(n) {
  let s = '';
  for (let i = 0; i < n; i++) {
    s += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return s;
}

export const hook = (_this, method, callback) => {
  const orig = _this[method];

  return (...args) => {
    callback.apply(null, args);

    return orig.apply(_this, args);
  };
};

export function chunk(arr: Array<any>, size: number) {
  const chunks: any[] = [];

  let index = 0;
  while (index < arr.length) {
    chunks.push(arr.slice(index, size + index));
    index += size;
  }

  return chunks;
}

export function sortArrayByMap(arr, map = [], key) {
  if (!arr) return [];
  if (map.length === 0) return arr;

  return map.map(id => arr.find(item => item[key] === id));
}
