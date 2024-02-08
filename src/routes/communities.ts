import express, { Request, Response } from "express";
import { z } from "zod";

import db from "@/db";
import { restrict, validate } from "@/middlewares";
import asyncErrorHandler from "@utils/asyncErrorHandler";

const createCommunitySchema = z.object({
  body: z.object({
    title: z.string().min(4).max(30),
    creatorId: z.number(),
  }),
});

const router = express.Router();

router.post(
  "/",
  [validate(createCommunitySchema), restrict],
  asyncErrorHandler(async (req: Request, res: Response) => {
    const { creatorId, title } = req.body;

    const data = await db.community.create({
      data: {
        title,
        creatorId,
        members: {
          create: [{ memberId: creatorId }],
        },
      },
    });

    res.status(201).json(data);
  })
);

const searchCommunitySchema = z.object({
  params: z.object({
    searchText: z.string(),
  }),
});


router.get(
  "/search/:searchText",
  [validate(searchCommunitySchema), restrict],
  asyncErrorHandler(async (req: Request, res: Response) => {
    const { searchText } = req.params;

    const data = await db.community.findMany({
      take: 5,
      where: {
        title: {
          contains: searchText,
          mode: 'insensitive',
        },
      },
    });

    res.status(200).json(data);
  })
);

export default router;
