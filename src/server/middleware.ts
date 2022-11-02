import { NextApiRequest, NextApiResponse } from 'next';

export type MiddlewareFunction = (req: NextApiRequest, res: NextApiResponse, result?: any) => void;

export function createMiddleware(middleware: MiddlewareFunction) {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      middleware(req, res, result => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}
