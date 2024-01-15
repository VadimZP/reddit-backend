import express, { Request, Response } from 'express';
import { z } from 'zod';

import db from 'db';
import CustomError from '@utils/CustomError';
import asyncErrorHandler from '@utils/asyncErrorHandler';
import { restrict, validate } from '@/middlewares';

const router = express.Router();

interface RequestWithUserData extends Request {
  user: {
    _id: number, iat: number
  }
}

router.get("/", restrict, asyncErrorHandler(async (req: Request, res: Response) => {
  // @ts-ignore TODO: fix typescript
  const { _id } = req.user;

  const data = await db.user.findUnique({
    where: {
      id: _id,
    },
  })

  if (!data) throw new CustomError("User was not found", 404);

  res.status(200).json(data);
}));

router.get("/:username", restrict, asyncErrorHandler(async (req: Request, res: Response) => {
  const { username } = req.params;

  const data = await db.user.findUnique({
    where: {
      username,
    },
  })

  if (!data) throw new CustomError("User was not found", 404);

  res.status(200).json(data);
}));


const getCommunitiesSchema = z.object({
  params: z.object({
    userId: z.string()
  }),
});


router.get("/:userId/communities", [validate(getCommunitiesSchema), restrict], asyncErrorHandler(async (req: Request, res: Response) => {
  // @ts-ignore
  const { userId } = req.params;

  const data = await db.community.findMany({
    where: {
      creatorId: +userId
    }
  })

  res.status(200).json(data);
}));


export default router;