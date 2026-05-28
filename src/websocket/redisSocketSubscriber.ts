import { subscriber } from "../redis/pubsub";
import { io } from "./socketServer";
import { SOCKET_EVENTS } from "./socketEvents";

subscriber.subscribe(SOCKET_EVENTS.PRICE_UPDATE);

subscriber.on("message", async function (channel, message) {
  console.log("channel", channel);
  if (!channel) {
    return;
  }
  const parseMessage = JSON.parse(message);
  const room = `channel ${parseMessage.symbol}`;
  io.to(room).emit(SOCKET_EVENTS.PRICE_UPDATE, parseMessage);
  console.log("price update emitted for this " + room);
});
