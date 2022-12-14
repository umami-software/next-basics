const baseX = require('base-x');

export const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const base62 = baseX(BASE62);

export function hexStringToBuffer(str: string): Uint8Array {
  return Uint8Array.from(str.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
}

export function bufferToHexString(bytes: Uint8Array): string {
  return bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
}

export function hexStringToUuid(str: string): string {
  const arr = str.split('');

  [8, 13, 18, 23].forEach(idx => {
    return arr.splice(idx, 0, '-');
  });

  return arr.join('');
}

export function encodeUuid(uuid: string): string | null {
  try {
    return base62.encode(hexStringToBuffer(uuid.replace(/-/g, '')));
  } catch {
    return null;
  }
}

export function decodeUuid(id: Uint8Array): string | null {
  try {
    return hexStringToUuid(bufferToHexString(base62.decode(id)));
  } catch {
    return null;
  }
}
