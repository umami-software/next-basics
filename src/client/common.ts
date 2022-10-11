import { shuffleArray } from 'client/array';

export function getRandomChars(
  n,
  chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
) {
  const arr = shuffleArray(chars.split(''));
  let s = '';
  for (let i = 0; i < n; i++) {
    s += arr[Math.floor(Math.random() * arr.length)];
  }
  return s;
}

export function hook(_this, method, callback) {
  const orig = _this[method];

  return (...args) => {
    callback.apply(null, args);

    return orig.apply(_this, args);
  };
}
