const express = require("express");
const session = require("express-session");
const cors = require("cors");
const pgp = require("pg-promise")(/* options */);
const { dbConfig } = require("./config");

const db = pgp(dbConfig);

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(
  session({
    store: new (require("connect-pg-simple")(session))({
      conObject: dbConfig,
    }),
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
    },
  })
);

module.exports = { app, db };
