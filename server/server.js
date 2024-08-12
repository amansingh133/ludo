import express from "express";
import { Server as SocketIO } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 5000;

let users = [];
let userId = 1;

app.get("/", (req, res) => {
  res.send(`Server is running on ${PORT}`);
});

io.on("connection", (socket) => {
  console.log("a user connected : ", socket.id);

  socket.on("addUser", (name) => {
    const newUser = { id: userId++, socketId: socket.id, name: name };
    users.push(newUser);
    io.emit("userList", users);
    console.log("Users : ", users);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected : ", socket.id);
    users = users.filter((user) => user.socket.id !== socket.id);
    io.emit("userList", users);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
