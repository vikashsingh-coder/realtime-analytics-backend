import amqp, { Channel, ConfirmChannel, ChannelModel } from "amqplib";
import { setupTopology } from "./topology";
import { env } from "../config/env";

let connection: ChannelModel;
let producerChannel: ConfirmChannel;

export const connectRabbitMQ = async (): Promise<void> => {
  try {
    connection = await amqp.connect(env.RABBITMQ_URL);

    connection.on("error", (err) => {
      console.error("RabbitMQ connection error:", err.message);
    });

    connection.on("close", () => {
      console.log("RabbitMQ connection closed");
    });

    producerChannel = await connection.createConfirmChannel();
  } catch (error) {
    if (error instanceof Error)
      console.log("RabbitMQ connection failed", error.message);
  }
};

export const getProducer = (): ConfirmChannel => {
  if (!producerChannel) {
    throw new Error(
      "Producer channel is not initialized. Call connectRabbitMQ first.",
    );
  }
  return producerChannel;
};

export const consumerChannel = async (): Promise<Channel> => {
  if (!connection) {
    throw new Error(
      "RabbitMQ connection is not established. Call connectRabbitMQ first.",
    );
  }
  return connection.createChannel(); // Add return statement
};

export const closeRabbitMQ = async (): Promise<void> => {
  // await producerChannel.close();

  await setupTopology(producerChannel);
  // await connection.close();
  await producerChannel.close();

  console.log("RabbitMQ connection closed");
};

// async setup(model) {
//   console.log("RabbitMQ recovery sutup running....");
//   const ch = await model.createChannel();
//   await setupTopology(ch);
//   await ch.close();
// }
