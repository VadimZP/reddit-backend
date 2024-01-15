import { NextFunction, Request, Response } from 'express';
import { Schema } from 'zod';
import dotenv from 'dotenv';
import * as jwt from "jsonwebtoken"

import CustomError from '@utils/CustomError';

dotenv.config();

export const validate = (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    next();
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const restrict = (req: Request, _res: Response, next: NextFunction) => {
  if (!process.env.TOKEN_SECRET) {
    throw new CustomError("Internal server error", 500)
  }

  const cookie = req.cookies.jwt;

  if (!cookie) throw new CustomError("Unauthenticated", 401);

  // @ts-ignore TODO: fix typescript
  jwt.verify(cookie, process.env.TOKEN_SECRET, (err: unknown, data) => {
    if (err) throw new CustomError("You don't have access", 403);

    // @ts-ignore TODO: fix typescript
    req.user = data;

    next();
  })
}
