import { Channel } from "amqplib";
import { EXCHANGE, QUEUE, ROUTING_KEY } from "./constants";

export const setupTopology = async (channel: Channel): Promise<void> => {
  // Exchanges
  await channel.assertExchange(EXCHANGE.ANALYTICS, "topic", { durable: true });
  // Dead Letter Queues
  await channel.assertQueue(QUEUE.ALERT_QUEUE_DLQ, { durable: true });
  // Main Queues
  await channel.assertQueue(QUEUE.ALERT_QUEUE, {
    durable: true,
    deadLetterExchange: "",
    deadLetterRoutingKey: QUEUE.ALERT_QUEUE_DLQ,
  });
  // Bindings
  await channel.bindQueue(
    QUEUE.ALERT_QUEUE,
    EXCHANGE.ANALYTICS,
    ROUTING_KEY.ALERT_CREATED,
  );
  console.log("RabbitMQ topology setup completed.");
};
