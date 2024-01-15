import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import users from '@routes/users';
import communities from '@routes/communities';
import register from '@routes/register';
import login from '@routes/login';

dotenv.config();

const app: Express = express()

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/register", register);
app.use("/login", login);
app.use("/users", users);
app.use("/communities", communities);

app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    statusCode: statusCode,
    message: error.message
  });
})

app.listen(8000, () => {
  console.log(`App is listening on port ${process.env.SERVER_PORT}`);
});
