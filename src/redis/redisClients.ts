import Redis from "ioredis";
import { env } from "../config/env";

const redis = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
  retryStrategy(times) {
    console.log(`Redis connection attempt: ${times}`);
    return Math.min(times * 100, 3000);
  },
});

redis.on("connect", () => {
  console.log("Redis successfully connected");
});

redis.on("error", (err) => {
  if (err instanceof Error) {
    console.error("Redis connection error:", err.message);
  }
});

redis.on("close", () => {
  console.log("Redis connection closed");
});

export default redis;

// command to run redis server by docker
// docker run -d -p 6379:6379 --name redis redis
