import { Server } from "socket.io";

const configureSocket = (server) => {
  const io = new Server(server, {
    transports: ["websocket", "polling"],
    cors: "*",
  });

  return io;
};

export default configureSocket;
