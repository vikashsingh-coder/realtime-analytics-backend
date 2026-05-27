import { Socket } from "socket.io";

export const socketMiddleware = (
  socket: Socket,
  next: (err?: Error) => void,
) => {
  try {
    // here will manage authentication and faliure
    console.log(`Client connected: ${socket.id}`);
    next();
  } catch (error) {
    next(new Error("socket authentication error"));
  }
};
