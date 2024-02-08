import express, { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

import db from "@/db";
import asyncErrorHandler from "@utils/asyncErrorHandler";
import CustomError from "@utils/CustomError";

dotenv.config();

const router = express.Router();

router.post("/", asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (!process.env.TOKEN_SECRET) {
    throw new CustomError("Internal server error", 500)
  }

  const data = await db.user.findUnique({ where: { email: req.body.email } });
  if (!data) throw new CustomError("User was not found", 404);

  const passwordIsCorrect = await bcrypt.compare(req.body.password, data.password);
  if (!passwordIsCorrect) throw new CustomError("Invalid credentials", 500);

  const token = jwt.sign({ _id: data.id }, process.env.TOKEN_SECRET)

  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    path: '/',
    sameSite: 'lax'
  })

  res.cookie('userId', data.id, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    path: '/',
    sameSite: 'lax'
  })

  res.cookie('username', data.username, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    path: '/',
    sameSite: 'lax'
  })

  const { password, ...rest } = data;

  return res.status(200).json(rest)
}));

export default router;
