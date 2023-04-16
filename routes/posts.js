const express = require("express");
const router = express.Router();

const { db } = require("./../app");
const { restrict } = require("./../shared/middlewares");

const getAllPosts = async () => {
  let data;
  try {
    data = await db.any(
      "SELECT post_id, title, content, posts.created_at, author_id, count(like_id) as likes FROM posts LEFT JOIN likes USING (post_id) GROUP BY posts.post_id ORDER BY created_at DESC"
    );
  } catch (error) {
    throw new Error("Error:", error);
  }
  return data;
};

const createPost = async (payload) => {
  const { content, created_at, title } = payload;
  let data;
  try {
    data = await db.one(
      "INSERT INTO posts (content, created_at, title) VALUES ($1, $2, $3) RETURNING post_id, content, created_at, title",
      [content, created_at, title]
    );
  } catch (error) {
    throw new Error("Error:", error);
  }
  return data;
};

router.get("/", restrict, async (req, res) => {
  const data = await getAllPosts();
  return res.status(200).json(data);
});

router.post("/", restrict, async (req, res) => {
  const data = await createPost(req.body);
  res.status(201).json(data);
});

module.exports = router;
