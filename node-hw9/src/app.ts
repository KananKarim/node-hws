import express from "express";
import { AppDataSource } from "./data-source.ts";
import dotenv from "dotenv";
dotenv.config();
import loggingMiddleware from "./middlewares/logging.ts";
import newsRouter from "./routes/news.route.ts";
import userRouter from "./routes/user.route.ts";
import passport from "./passport.ts";
import authenticate from "./middlewares/auth.ts";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import http from "http";
import initializeSocket from "./services/socket.service.ts";

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

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(passport.initialize());
app.use(loggingMiddleware);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "..", "views")));

app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/news", (req, res) => {
  res.render("news");
});

initializeSocket(io);

export const sendNewsToClients = (newPost) => io.emit("addNews", newPost);
export const sendDeletedNewsToClients = async (newPost) => await io.emit("deleteNews", newPost);
export const sendUpdatedNewsToClients = async (newPost) => await io.emit("updateNews", newPost);

app.use("/api/newsposts", authenticate, newsRouter);
app.use("/auth", userRouter);

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`server running on ${port}`);
});
