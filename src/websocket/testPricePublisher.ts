import redis from "../redis/redisClients";
import { SOCKET_EVENTS } from "../websocket/socketEvents";

setInterval(() => {
  const payload = {
    symbol: "AALM",
    price: Number(Math.random() * 1000).toFixed(2),
    timeStamp: Date.now(),
  };

  redis.emit(SOCKET_EVENTS.PRICE_UPDATE, JSON.stringify(payload));
  console.log("published " + payload);
}, 2000);
