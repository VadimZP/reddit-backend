import express, { Request, Response } from "express";
import { z } from "zod";

import db from "@/db";
import { restrict, validate } from "@/middlewares";
import asyncErrorHandler from "@utils/asyncErrorHandler";

const router = express.Router();

const getCommentsByPostIdSchema = z.object({
  params: z.object({
    postId: z.string(),
  }),
});

router.get(
  "/:postId",
  [validate(getCommentsByPostIdSchema), restrict],
  asyncErrorHandler(async (req: Request, res: Response) => {
    const { postId } = req.params;

    const data = await db.comment.findMany({
      where: {
        postId: +postId,
      },
    });

    res.status(200).json(data);
  })
);

const createCommentsSchema = z.object({
  body: z.object({
    text: z.string(),
    authorId: z.number(),
    postId: z.number(),
  }),
});

router.post(
  "/",
  [validate(createCommentsSchema), restrict],
  asyncErrorHandler(async (req: Request, res: Response) => {
    const { text, authorId, postId } = req.body;

    const data = await db.comment.create({
      data: {
        text,
        authorId,
        postId,
      },
    });

    res.status(201).json(data);
  })
);

export default router;
