import { Socket } from "socket.io";

export const registerDisconnectHandler = (socket: Socket) => {
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
};
