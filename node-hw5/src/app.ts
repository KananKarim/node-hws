import express from "express";
import { AppDataSource } from "./data-source.ts";
import dotenv from "dotenv";
dotenv.config();
import loggingMiddleware from "./middlewares/logging.ts";
import newsRouter from "./routes/news.route.ts";

const initApp = async () => {
  try {
    await AppDataSource.initialize()
      .then(() => {
        console.log("Connection has established...");
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (err) {
    console.error(err, "There's an error with the connection. Fix it!");
  }
};

initApp();

const app = express();

app.use(express.json());
app.use(loggingMiddleware);
app.use("/api/newsposts", newsRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server running on ${port}`);
});