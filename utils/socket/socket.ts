"use client";

import { Socket, io } from "socket.io-client";

export const socket: Socket = io("http://43.201.76.17:4000/mafia", {
  autoConnect: false
});
