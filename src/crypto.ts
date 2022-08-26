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

export function hash(
  value: string | string[],
  algorithm: string = 'sha512',
  encoding: 'base64' | 'base64url' | 'hex' = 'hex',
) {
  const data = Array.isArray(value) ? value.join('') : value;
  return crypto.createHash(algorithm).update(data).digest(encoding);
}

function getKey(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 10000, 32, 'sha512');
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
  const salt = str.slice(0, SALT_LENGTH);
  const iv = str.slice(SALT_LENGTH, TAG_POSITION);
  const tag = str.slice(TAG_POSITION, ENC_POSITION);
  const encrypted = str.slice(ENC_POSITION);

  const key = getKey(secret, salt);

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);

  decipher.setAuthTag(tag);

  return decipher.update(encrypted) + decipher.final('utf8');
}

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, SALT_ROUNDS);
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
