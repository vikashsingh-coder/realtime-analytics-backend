import { Options } from "amqplib";
import { getProducer } from "./connection";

export const publishToQueue = async function (
  queue: string,
  message: string,
  options?: Options.Publish,
): Promise<void> {
  const channel = getProducer();
  await channel.assertQueue(queue, { durable: true });

  return new Promise((resolve, reject) => {
    channel.sendToQueue(
      queue,
      Buffer.from(message),
      { persistent: true, ...options },
      (err) => {
        if (err) {
          console.error("message publish failed:", err.message);
          reject(err);
        } else {
          resolve();
        }
      },
    );
  });
};
