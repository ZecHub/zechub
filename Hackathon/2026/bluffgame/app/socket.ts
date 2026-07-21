import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    // When no URL is provided, socket.io-client connects to the page's own
    // origin automatically — works in dev (localhost:3000) and production.
    // Set NEXT_PUBLIC_SOCKET_URL to override (e.g. staging environment).
    const url = process.env.NEXT_PUBLIC_SOCKET_URL;
    socket = url ? io(url, { autoConnect: false }) : io({ autoConnect: false });
  }
  return socket;
};
