const baseX = require('base-x');

export const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const base62 = baseX(BASE62);

export function hexStringToBuffer(str: string): Uint8Array {
  return Uint8Array.from(str.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
}

export function bufferToHexString(bytes: Uint8Array): string {
  return bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
}

function hexToUuid(str) {
  const arr = str.split('');

  [8, 13, 18, 23].forEach(idx => {
    return arr.splice(idx, 0, '-');
  });

  return arr.join('');
}

function encodeUuid(uuid) {
  return base62.encode(hexStringToBuffer(uuid.replace(/-/g, '')));
}

function decodeUuid(id) {
  return hexToUuid(bufferToHexString(base62.decode(id)));
}
