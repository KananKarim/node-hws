import express from "express";
import logger from "./middleware/logger.js";
import router from './routes/route.js';
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(logger);
app.use(router);

const host = process.env.HOST 
const port = process.env.PORT

app.listen(port, host, () => console.log(`Server is running on ${host}:${port}`));
