import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const SALT_LENGTH = 64;
const TAG_LENGTH = 16;
const TAG_POSITION = SALT_LENGTH + IV_LENGTH;
const ENC_POSITION = TAG_POSITION + TAG_LENGTH;
const SALT_ROUNDS = 10;

const getKey = (password, salt) => crypto.pbkdf2Sync(password, salt, 10000, 32, 'sha512');

export function hash(
  value?: string | string[] | Buffer,
  algorithm: string = 'sha512',
  encoding: 'base64' | 'base64url' | 'hex' = 'hex',
) {
  let str = value || crypto.randomBytes(256);

  if (Array.isArray(value)) {
    str = value.join('');
  }

  return crypto.createHash(algorithm).update(str.toString()).digest(encoding);
}

export function encrypt(value: any, secret: any) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const salt = crypto.randomBytes(SALT_LENGTH);
  const key = getKey(secret, salt);

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  const encrypted = Buffer.concat([cipher.update(String(value), 'utf8'), cipher.final()]);

  const tag = cipher.getAuthTag();

  return Buffer.concat([salt, iv, tag, encrypted]).toString('base64');
}

export function decrypt(value: any, secret: any) {
  const str = Buffer.from(String(value), 'base64');
  const salt = str.subarray(0, SALT_LENGTH);
  const iv = str.subarray(SALT_LENGTH, TAG_POSITION);
  const tag = str.subarray(TAG_POSITION, ENC_POSITION);
  const encrypted = str.subarray(ENC_POSITION);

  const key = getKey(secret, salt);

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);

  decipher.setAuthTag(tag);

  return decipher.update(encrypted) + decipher.final('utf8');
}

export function hashPassword(password: string, rounds = SALT_ROUNDS) {
  return bcrypt.hashSync(password, rounds);
}

export function checkPassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}

export function createToken(payload: any, secret: any, options?: any) {
  return jwt.sign(payload, secret, options);
}

export function parseToken(token: string, secret: any) {
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
}

export function createSecureToken(payload: any, secret: any, options?: any) {
  return encrypt(createToken(payload, secret, options), secret);
}

export function parseSecureToken(token: string, secret: any) {
  try {
    return jwt.verify(decrypt(token, secret), secret);
  } catch {
    return null;
  }
}

export async function parseAuthToken(req, secret) {
  try {
    return parseSecureToken(req.headers.authorization.split(' ')[1], secret);
  } catch {
    return null;
  }
}
