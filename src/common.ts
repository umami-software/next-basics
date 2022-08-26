export const hook = (_this, method, callback) => {
  const orig = _this[method];

  return (...args) => {
    callback.apply(null, args);

    return orig.apply(_this, args);
  };
};

export function chunk(arr: Array<any>, size: number) {
  const chunks = [];

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
