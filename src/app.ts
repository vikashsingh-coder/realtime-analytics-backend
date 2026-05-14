import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { env } from "./config/env";
import { connectDB } from "./config/db";
import redis from "./redis/redisClients";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  const redisHealth = redis.status;
  const mongoStatus = mongoose.connection.readyState;
  res.status(200).json({
    status: "ok",
    enviroment: env.NODE_ENV,
    redis: redisHealth,
    mongo: mongoStatus === 1 ? "connected" : "disconnected",
  });
});

const startServer = async () => {
  // connect to database
  await connectDB();

  // start the server
  app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
  });
};

startServer();

// graceful shutdown
process.on("SIGINT", async () => {
  console.log("shutting down server gracefully");
  // close database connection
  await mongoose.connection.close();
  // use quit() instead of disconnect() -> all pending commands processed before closing connection.
  await redis.quit();
  process.exit(0);
});
