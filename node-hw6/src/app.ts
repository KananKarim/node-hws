import express from "express";
import { AppDataSource } from "./data-source.ts";
import dotenv from "dotenv";
dotenv.config();
import loggingMiddleware from "./middlewares/logging.ts";
import newsRouter from "./routes/news.route.ts";
import userRouter from "./routes/user.route.ts";
import passport from "./passport.ts";
import authenticate from "./middlewares/auth.ts";

const initApp = async () => {
  try {
    await AppDataSource.initialize()
      .then(() => {
        console.log("Connection okay");
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (err) {
    console.error(err, "Connection error");
  }
};

(async () => {
  await initApp();
})();

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.use(loggingMiddleware);


app.use("/api/newsposts",authenticate, newsRouter);
app.use("/auth", userRouter);


const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server running on ${port}`);
});