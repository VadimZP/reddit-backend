const express = require("express");
const session = require("express-session");
const cookieSession = require('cookie-session')
var cookieParser = require('cookie-parser')

const cors = require("cors");
const pgp = require("pg-promise")(/* options */);
const { dbConfig } = require("./config");

const db = pgp(dbConfig);

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser())


// app.use(cookieSession({
//   name: 'session',
//   keys: [process.env.EXPRESS_SESSION_SECRET],

//   // Cookie Options
//   maxAge: 24 * 60 * 60 * 1000 // 24 hours
// }))

// app.use(
//   session({
//     store: new (require("connect-pg-simple")(session))({
//       conObject: dbConfig,
//     }),
//     secret: process.env.EXPRESS_SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: false,
//       httpOnly: true,
//     },
//   })
// );

module.exports = { app, db };
