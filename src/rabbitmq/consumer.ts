import { ConsumeMessage } from "amqplib";
import { consumerChannel } from "./connection";

export const consumeQueue = async function (
  queue: string,
  handler: (data: unknown) => Promise<void>,
): Promise<void> {
  // const connection = await amqp.connect(env.RABBITMQ_URL);
  const channel = await consumerChannel();
  await channel.assertQueue(queue, { durable: true });
  console.log("consumer queue", queue);

  await channel.consume(queue, async (message: ConsumeMessage | null) => {
    if (!message) {
      console.log("consumer cancelled by broker");
      return;
    }
    try {
      const parsedData = JSON.parse(message.content.toString());
      await handler(parsedData);
      channel.ack(message);
    } catch (error) {
      console.log(
        "cosumer process error",
        error instanceof Error ? error.message : error,
      );
    }
  });
};
