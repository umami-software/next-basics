import { NextRequest, NextResponse } from 'next/server';

export type MiddlewareFunction = (req: NextRequest, res: NextResponse, result: any) => void;

export function createMiddleware(middleware: MiddlewareFunction) {
  return (req: NextRequest, res: NextResponse) =>
    new Promise((resolve, reject) => {
      middleware(req, res, result => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}
