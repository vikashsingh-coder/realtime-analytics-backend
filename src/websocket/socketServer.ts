import http from "http";
import { Server } from "socket.io";
import { registerConnectionHandler } from "./socketHandlers/connectionHandler";
import { socketMiddleware } from "./socketMiddleware";
import { publisher, subscriber } from "../redis/pubsub";
import { createAdapter } from "@socket.io/redis-adapter";
import express from "express";

export let io: Server;

export const intializeSocketServer = (app: express.Application) => {
  const server = http.createServer(app);
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.adapter(createAdapter(publisher, subscriber));

  io.use(socketMiddleware);

  io.on("connection", (socket) => {
    console.log(`socket connection ${socket.id}`);
    registerConnectionHandler(socket);
  });

  return server;
};
