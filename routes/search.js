const express = require("express");
const router = express.Router();

const { db } = require("./../app");
const { restrict } = require("./../shared/middlewares");

const getPostsBySearchQuery = async (text) => {
  let data;
  const searchQuery = `%${text}%`;
  try {
    data = await db.any("SELECT * FROM posts WHERE title ILIKE $1", [searchQuery]);
  } catch (error) {
    throw new Error("Error:", error);
  }
  return data;
};

router.get("/", restrict, async (req, res) => {
  const { text } = req.query;
  const data = await getPostsBySearchQuery(text);
  res.status(200).json(data);
});

module.exports = router;
