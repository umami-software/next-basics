import prand from 'pure-rand';

// tslint:disable-next-line:no-bitwise
const seed = Date.now() ^ (Math.random() * 0x100000000);
const rng = prand.xoroshiro128plus(seed);

export function random(min: number, max: number) {
  return prand.unsafeUniformIntDistribution(min, max, rng);
}

export function hook(
  _this: { [x: string]: any },
  method: string | number,
  callback: (arg0: any) => void,
) {
  const orig = _this[method];

  return (...args: any) => {
    callback.apply(_this, args);

    return orig.apply(_this, args);
  };
}

export function sleep(ms: number | undefined) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getRandomChars(
  n: number,
  chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
) {
  const arr = chars.split('');
  let s = '';
  for (let i = 0; i < n; i++) {
    s += arr[random(0, arr.length - 1)];
  }
  return s;
}
