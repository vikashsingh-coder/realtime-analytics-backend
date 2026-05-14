import { publisher, subscriber } from "./pubsub";

subscriber.subscribe("TEST_CHANNEL");

subscriber.on("message", (channel, message) => {
  console.log({
    channel,
    message,
  });
});

setTimeout(() => {
  publisher.publish(
    "TEST_CHANNEL",
    JSON.stringify({
      event: "hello world",
    }),
  );
}, 2000);

// Command to run test file
// npx ts-node src/redis/testPubSub.ts
