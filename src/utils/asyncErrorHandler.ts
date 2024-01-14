// @ts-nocheck TODO: fix typescript

import { Prisma } from '@prisma/client'

const asyncErrorHandler = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((error: unknown) => {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return next({ message: `Such ${error.meta.target[0]} already exists`, statusCode: 409 })
        }
      }
      return next(error)
    });
  }
}

export default asyncErrorHandler;