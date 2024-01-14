import express from 'express';
import { z } from 'zod';

import db from '@/db';
import { restrict, validate } from '@/middlewares';
import asyncErrorHandler from '@utils/asyncErrorHandler';

const createCommunitySchema = z.object({
  body: z.object({
    title: z.string().min(4).max(30),
    creatorId: z.number()
  }),
});

const router = express.Router();

// @ts-ignore TODO: fix typescript
router.post("/", [validate(createCommunitySchema), restrict], asyncErrorHandler(async (req, res) => {
  const { creatorId, title } = req.body;

  const data = await db.community.create({
    data: {
      title,
      creatorId
    }
  })

  // console.log(data)

  res.status(201).json(data);
}));

export default router;