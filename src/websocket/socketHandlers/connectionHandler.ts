import { Socket } from "socket.io";
import { registerSubscribeHandler } from "./subscribeHandler";
import { registerDisconnectHandler } from "./disconnectHandler";

export const registerConnectionHandler = (socket: Socket) => {
  registerSubscribeHandler(socket);
  registerDisconnectHandler(socket);
};
