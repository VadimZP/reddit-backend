import express, { Request, Response } from "express";
import { z } from "zod";

import db from "@/db";
import { restrict, validate } from "@/middlewares";
import asyncErrorHandler from "@utils/asyncErrorHandler";

const router = express.Router();

router.get(
  "/",
  restrict,
  asyncErrorHandler(async (req: Request, res: Response) => {
    const data = await db.post.findMany({
      select: {
        id: true,
        title: true,
        text: true,
        author: {
          select: {
            username: true,
          },
        },
        community: {
          select: {
            title: true,
          },
        },
        createdAt: true,
      },
    });

    res.status(200).json(data);
  })
);

const createPostSchema = z.object({
  body: z.object({
    title: z.string().min(4).max(100),
    text: z.string().min(4).max(30),
    communityId: z.number(),
    authorId: z.number(),
  }),
});

router.post(
  "/",
  [validate(createPostSchema), restrict],
  asyncErrorHandler(async (req: Request, res: Response) => {
    const { title, text, communityId, authorId } = req.body;

    const data = await db.post.create({
      data: {
        title,
        text,
        communityId,
        authorId,
      },
    });

    res.status(201).json(data);
  })
);

export default router;
