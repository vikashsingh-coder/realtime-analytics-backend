import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    enviroment: env.NODE_ENV,
  });
});

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
