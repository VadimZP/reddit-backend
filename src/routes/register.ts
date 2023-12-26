import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import z from 'zod';

import db from '@/db';
import asyncErrorHandler from '@utils/asyncErrorHandler';
import CustomError from '@utils/CustomError';
import { validate } from '@/middlewares';

const RegisterSchema = z.object({
  body: z.object({
    email: z.string().email(),
    username: z.string().min(2).max(18),
    password: z.string().min(6),
  }),
});


const router = express.Router();

router.post("/", validate(RegisterSchema), asyncErrorHandler(async (req: Request, res: Response) => {
  const { email, username } = req.body;

  const data = await db.user.findFirst({
    where: {
      OR: [
        { email },
        { username }
      ]
    }
  })

  if (data?.email === email) {
    throw new CustomError("User with this email already exists", 403)
  }

  if (data?.username === username) {
    throw new CustomError("User with this username already exists", 403)
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const { password, ...rest } = await db.user.create({
    data: {
      email,
      username,
      password: hashedPassword
    }
  })

  res.status(201).json(rest);
}));

export default router;