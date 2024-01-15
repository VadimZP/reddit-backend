
import { Prisma } from '@prisma/client'
import { NextFunction, Request, Response } from 'express';

const asyncErrorHandler = (func: (req: Request, res: Response, next: NextFunction) => Promise<unknown>) => {
  return (req: Request, res: Response, next: NextFunction) => {

    func(req, res, next).catch((error: unknown) => {

      if (error instanceof Prisma.PrismaClientKnownRequestError) {

        if (error.code === 'P2002' && error.meta) {
          const target = error.meta.target as Array<string>;

          return next({ message: `Such ${target[0]} already exists`, statusCode: 409 })
        }
      }

      return next(error)
    });
  }
}

export default asyncErrorHandler;