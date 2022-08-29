const {
  createToken,
  parseToken,
  encrypt,
  decrypt,
  createSecureToken,
  parseSecureToken,
  buildUrl,
} = require('./dist/cjs/index');

(async () => {
  const data = { id: `abc:${Date.now()}` };
  const secret = 'cheese';
  const token = await createToken(data, secret);
  const result = await parseToken(token, secret);

  const str = 'there is no spoon';
  const enc = encrypt(str, secret);
  const dec = decrypt(enc, secret);

  const st = createSecureToken(data, secret);
  const dt = parseSecureToken(st, secret);

  console.log({ data, secret, token, result, str, enc, dec, st, dt });

  console.log(buildUrl('page.html', { a: 1, b: 2, c: undefined }));
})();
