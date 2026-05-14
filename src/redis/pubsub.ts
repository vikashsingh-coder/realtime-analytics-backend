import Redis from "ioredis";
import { env } from "../config/env";

export const publisher = new Redis(env.REDIS_URL);

export const subscriber = new Redis(env.REDIS_URL);

publisher.on("connect", () => {
  console.log("Redis publisher connected");
});

subscriber.on("connect", () => {
  console.log("Redis subscriber connected");
});
