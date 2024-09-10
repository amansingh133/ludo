import express from "express";
import http from "http";

//imports
import configureSocket from "./config/socket.js";
import setUpSocketEvents from "./handlers/socket.js";

const app = express();
const server = http.createServer(app);
const io = configureSocket(server);

const PORT = process.env.PORT || 5000;

let users = [];
let userId = 1;
let cellIds = [];

app.get("/", (req, res) => {
  res.send(`Server is running on ${PORT}`);
});

setUpSocketEvents(io);

server.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
