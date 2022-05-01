import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authToken = request.headers.authorization;
  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(
      token,
      '1c16a8dc6f4b56b9a55d856a8f805cfe',
    ) as IPayload;

    request.userId = sub;

    return next();
  } catch {
    return response.status(401).end();
  }
}
