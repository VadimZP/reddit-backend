const express = require("express");
const router = express.Router();

const { db } = require("./../app");

const findUser = async (payload) => {
  const { email, password } = payload;
  let data;
  try {
    data = await db.one(
      "SELECT user_id, name, email FROM users WHERE email = $1 AND password = crypt($2, password)",
      [email, password]
    );
  } catch (error) {
    throw new Error("Error:", error);
  }
  return data;
};

router.post("/", async (req, res) => {
  const data = await findUser(req.body);
  if (data) {
    // req.session.user = data;
    res.cookie('userId', data.user_id)
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: "Incorrect data" });
  }
});

module.exports = router;
