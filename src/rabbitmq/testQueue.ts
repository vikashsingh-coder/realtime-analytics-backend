import { connectRabbitMQ } from "./connection";
import { consumeQueue } from "./consumer";
import { publishEvents } from "./producer";
import { EXCHANGE, QUEUE, ROUTING_KEY } from "./constants";

const run = async () => {
  await connectRabbitMQ();
  await consumeQueue(QUEUE.ALERT_QUEUE, async (data) => {
    console.log("processed", data);
  });

  setTimeout(async () => {
    await publishEvents(EXCHANGE.ANALYTICS, ROUTING_KEY.ALERT_CREATED, {
      stock: "AAPL",
      price: 150,
    });
  }, 2000);
};

run();
