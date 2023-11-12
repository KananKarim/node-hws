import express from "express";
import { AppDataSource } from "./data-source.ts";
import dotenv from "dotenv";
dotenv.config();
import loggingMiddleware from "./middlewares/logging.ts";
import newsRouter from "./routes/news.route.ts";
import userRouter from "./routes/user.route.ts";
import passport from "./passport.ts";
import authenticate from "./middlewares/auth.ts";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from './swagger_output.json' assert { type: 'json' };

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

(async () => {
  await initApp();
})();

const app = express();

app.use(express.json());
const port = process.env.PORT;


app.use(passport.initialize());

app.use(loggingMiddleware);


app.use("/api/newsposts", authenticate, newsRouter);
app.use("/auth", userRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(port, () => {
  console.log(`server running on ${port}`);
});
