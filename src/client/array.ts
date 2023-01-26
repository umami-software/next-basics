export function shuffleArray(a) {
  const arr = a.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

export function chunkArray(arr: any[], size: number) {
  const chunks: any[] = [];

  let index = 0;
  while (index < arr.length) {
    chunks.push(arr.slice(index, size + index));
    index += size;
  }

  return chunks;
}

export function ensureArray(arr?: any) {
  if (arr === undefined || arr === null) return [];
  if (Array.isArray(arr)) return arr;
  return [arr];
}
