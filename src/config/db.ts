import mongoose from "mongoose";
import { env } from "./env";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("Mongodb successfully connected");
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.error("Errror connecting to mongodb", error.message);
    }
    process.exit(1);
  }
};

mongoose.connection.on("connected", () => {
  console.log("mongodb connection established");
});
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});
mongoose.connection.on("error", (err) => {
  console.error("mongodb connection error", err);
});
