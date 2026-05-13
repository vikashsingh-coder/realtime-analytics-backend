import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { env } from "./config/env";
import { connectDB } from "./config/db";

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
  await import("mongoose").then((mongoose) =>
    mongoose.default.connection.close(),
  );
  process.exit(0);
});
