import express, { Request, Response } from "express";
import { z } from "zod";

import db from "@/db";
import { restrict, validate } from "@/middlewares";
import asyncErrorHandler from "@utils/asyncErrorHandler";
import CustomError from "@utils/CustomError";

const router = express.Router();

const getCommentsByPostIdSchema = z.object({
  params: z.object({
    postId: z.number(),
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
        parentId: null,
      },
    });

    return res.status(200).json(data);
  }) 
);

enum CommentType {
  New = "new",
  Response = "response",
}

const createCommentsSchema = z.object({
  body: z
    .object({
      text: z.string(),
      authorId: z.number(),
      postId: z.number(),
      type: z.string(),
      parentId: z.number().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.type === CommentType.Response && !data.parentId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `type "${data.type}" should be provided with parentId`,
        });
      }

      if (data.type === CommentType.New && data.parentId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `type "${data.type}" should not be provided with parentId`,
        });
      }
    }),
});

router.post(
  "/",
  [validate(createCommentsSchema), restrict],
  asyncErrorHandler(async (req: Request, res: Response) => {
    const { text, authorId, postId, type, parentId } = req.body;

    if (type === CommentType.New) {
      const data = await db.comment.create({
        data: {
          text,
          authorId,
          postId,
        },
      });

      return res.status(201).json(data);
    }

    if (type === CommentType.Response) {
      const futureParent = await db.comment.findUnique({
        where: { id: parentId },
      });

      if (!futureParent) {
        throw new CustomError(
          "The comment you want to reply to doesn't exist",
          500
        );
      }

      const data = await db.comment.create({
        data: {
          text,
          authorId,
          postId,
          parentId,
        },
      });

      return res.status(201).json(data);
    }
  })
);

export default router;
