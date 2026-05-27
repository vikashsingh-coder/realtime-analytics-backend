import { Socket } from "socket.io";
import { SOCKET_EVENTS } from "../socketEvents";

export const registerSubscribeHandler = (socket: Socket) => {
  socket.on(SOCKET_EVENTS.SUBSCRIBE_STOCK, async (socketSymbol) => {
    const room = `room-${socketSymbol}`;
    await socket.join(room);
    console.log(`Client ${socket.id} join room ${room}`);
  });

  socket.on(SOCKET_EVENTS.UNSUBSCRIBE_STOCK, async (socketSymbol) => {
    const room = `room-${socketSymbol}`;
    await socket.leave(room);
    console.log(`Client ${socket.id} left room ${room}`);
  });
};
