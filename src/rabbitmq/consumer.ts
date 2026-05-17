import amqp from "amqplib";
import { env } from "../config/env";

async function receiveMessage() {
  const connection = await amqp.connect(env.RABBITMQ_URL);
  const channel = await connection.createChannel();
  const queue = "task_queue";

  await channel.assertQueue(queue, { durable: true });
  console.log(`Waiting for messages in ${queue}...`);

  channel.consume(
    queue,
    (msg: amqp.Message | null) => {
      if (msg) {
        console.log(`Received: ${msg.content.toString()}`);
        channel.ack(msg);
      }
    },
    { noAck: false },
  );
}

receiveMessage().catch(console.error);
