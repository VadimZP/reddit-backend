const express = require("express");
const router = express.Router();

const { db } = require("./../app");
const { restrict } = require("./../shared/middlewares");

const getPostsByUserId = async (payload) => {
  const { userId } = payload;
  let data;
  try {
    data = await db.any("SELECT * FROM posts WHERE author_id = $1", [userId]);
  } catch (error) {
    throw new Error("Error:", error);
  }
  return data;
};

const getPostByPostIdAndByUserId = async (payload) => {
  const { userId, postId } = payload;
  let data;
  try {
    data = await db.multi(
      "SELECT post_id, posts.content, posts.created_at, title, posts.author_id, COUNT (DISTINCT like_id) AS likes, COUNT (DISTINCT comment_id) AS comments FROM posts LEFT JOIN likes USING (post_id) LEFT JOIN comments USING (post_id) WHERE posts.author_id = $1 AND post_id = $2 GROUP BY post_id; SELECT comment_id, content, name, created_at FROM comments LEFT JOIN users on author_id = user_id WHERE post_id = $2;",
      [userId, postId]
    );

    const formattedData = {
      post: data[0][0],
      comments: data[1],
    };

    data = formattedData;
  } catch (error) {
    throw new Error("Error:", error);
  }
  return data;
};

const setLikeToPost = async (payload) => {
  const { postId, userId } = payload;
  let data;
  try {
    data = await db.oneOrNone(
      "INSERT INTO likes (post_id, user_id) SELECT $1, $2 WHERE NOT EXISTS (SELECT 1 FROM likes WHERE post_id = $1 AND user_id = $2) RETURNING post_id",
      [postId, userId]
    );
  } catch (error) {
    throw new Error("Error:", error);
  }
  return data;
};

const removeLikeFromPost = async (payload) => {
  const { postId, userId } = payload;
  let data;
  try {
    data = await db.oneOrNone(
      "DELETE FROM likes WHERE post_id = $1 AND user_id = $2",
      [postId, userId]
    );
  } catch (error) {
    throw new Error("Error:", error);
  }
  return data;
};

router.get("/:userId/posts", restrict, async (req, res) => {
  const data = await getPostsByUserId(req.params);
  res.status(200).json(data);
});

router.get("/:userId/posts/:postId", restrict, async (req, res) => {
  const data = await getPostByPostIdAndByUserId(req.params);
  res.status(200).json(data);
});

router.post("/:userId/posts/:postId/likes", restrict, async (req, res) => {
  const data = await setLikeToPost(req.body);
  if (data === null) {
    await removeLikeFromPost(req.body);
    res.status(204).send("No content!");
  } else {
    res.status(201).json(data);
  }
});

module.exports = router;
