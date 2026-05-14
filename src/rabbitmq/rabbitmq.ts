import amqp, { ChannelModel, ConfirmChannel } from "amqplib";
import { env } from "../config/env";

const connectRabbitMQ = async (): Promise<void> => {
  try {
  } catch (error) {
    console.error("RabbitMQ connection failed:", error);
    process.exit(1);
  }
};

const getChannel = async () => {};

const closeRabbitMQ = async () => {};

export { connectRabbitMQ, getChannel, closeRabbitMQ };
