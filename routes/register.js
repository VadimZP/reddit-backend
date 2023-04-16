const express = require("express");
const router = express.Router();

const { db } = require("./../app");

const findUser = async (payload) => {
  const { email, password } = payload;
  let data;
  try {
    data = await db.one(
      "SELECT user_id, email FROM users WHERE email = $1 AND password = crypt($2, password)",
      [email, password]
    );
  } catch (error) {
    throw new Error("Error:", error);
  }
  return data;
};

const createUser = async (payload) => {
  const { name, email, password } = payload;
  let data;
  try {
    data = await db.one(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, crypt($3, gen_salt('bf'))) RETURNING user_id, name, email",
      [name, email, password]
    );
  } catch (error) {
    throw new Error("Error:", error);
  }
  return data;
};

router.post("/", async (req, res) => {
  const data = await findUser(req.body);
  if (data) {
    res.status(403).json({ message: "User already exists" });
  } else {
    const data = await createUser(req.body);
    res.status(201).json(data);
  }
});

module.exports = router;
