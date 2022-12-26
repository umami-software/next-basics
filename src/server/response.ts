import type { NextApiResponse } from 'next';

export function ok(res: NextApiResponse, data: object = {}) {
  return json(res, data);
}

export function json(res: NextApiResponse, data: object = {}) {
  return res.status(200).json(data);
}

export function send(res: NextApiResponse, data: any, type = 'text/plain') {
  res.setHeader('Content-Type', type);

  return res.status(200).send(data);
}

export function redirect(res: NextApiResponse, url: string) {
  res.setHeader('Location', url);

  return res.status(303).end();
}

export function badRequest(res: NextApiResponse, msg = '400 Bad Request') {
  return res.status(400).end(msg);
}

export function unauthorized(res: NextApiResponse, msg = '401 Unauthorized') {
  return res.status(401).end(msg);
}

export function forbidden(res: NextApiResponse, msg = '403 Forbidden') {
  return res.status(403).end(msg);
}

export function notFound(res: NextApiResponse, msg = '404 Not Found') {
  return res.status(404).end(msg);
}

export function methodNotAllowed(res: NextApiResponse, msg = '405 Method Not Allowed') {
  res.status(405).end(msg);
}

export function tooManyRequest(res: NextApiResponse, msg = '429 Too Many Request') {
  return res.status(429).end(msg);
}

export function serverError(res: NextApiResponse, msg = '500 Internal Server Error') {
  res.status(500).end(msg);
}
