import express, { Response } from 'express';

import db from 'db';
import CustomError from '@utils/CustomError';
import asyncErrorHandler from '@utils/asyncErrorHandler';
import { restrict } from '@/middlewares';

const router = express.Router();

interface RequestWithUserData {
  user: {
    _id: number, iat: number
  }
}

router.get("/", restrict, asyncErrorHandler(async (req: RequestWithUserData, res: Response) => {
  const { _id } = req.user;

  const data = await db.user.findUnique({
    where: {
      id: _id,
    },
  })

  if (!data) throw new CustomError("User was not found", 404);

  res.status(200).json(data);
}));

export default router;