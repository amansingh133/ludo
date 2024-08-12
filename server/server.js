import express from "express";
import { Server as SocketIO } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server);

const PORT = process.env.PORT || 5000;

let users = [];
let userId = 1;
let cellIds = [];
const colors = [
  { color: "red", indicatorCells: [] },
  { color: "green", indicatorCells: [] },
  { color: "yellow", indicatorCells: [] },
  { color: "blue", indicatorCells: [] },
];

app.get("/", (req, res) => {
  res.send(`Server is running on ${PORT}`);
});

io.on("connection", (socket) => {
  console.log("a user connected : ", socket.id);

  socket.on("addUser", (name) => {
    const userColor = colors[users.length % colors.length];

    const newUser = {
      id: userId++,
      name: name,
      socketId: socket.id,
      color: userColor.color,
    };
    users.push(newUser);
    io.emit("userList", users);

    if (users.length === 4) {
      io.emit("startGame", users);
    }

    console.log("User Added:", newUser);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected : ", socket.id);
    users = users.filter((user) => user.socketId !== socket.id);
    io.emit("userList", users);
  });

  socket.on("createBoard", ({ width }) => {
    const paddingHorizontal = width * 0.05;
    const boxSize = width * 0.9;
    const cellSize = boxSize / 15;

    cellIds.length = 0;

    for (let row = 0; row < 15; row++) {
      for (let col = 0; col < 15; col++) {
        cellIds.push(`${row}-${col}`);
      }
    }

    colors.forEach((colorObj) => (colorObj.indicatorCells = []));

    // Define the cell ranges for each color
    const colorRanges = {
      red: { startRow: 9, startCol: 0 },
      green: { startRow: 0, startCol: 0 },
      yellow: { startRow: 0, startCol: 9 },
      blue: { startRow: 9, startCol: 9 },
    };

    const cellRangeSize = 6;

    users.forEach((user) => {
      const colorObj = colors.find((c) => c.color === user.color);
      const { startRow, startCol } = colorRanges[user.color];

      if (colorObj) {
        for (let row = 0; row < cellRangeSize; row++) {
          for (let col = 0; col < cellRangeSize; col++) {
            const cellId = `${startRow + row}-${startCol + col}`;
            if (cellIds.includes(cellId)) {
              colorObj.indicatorCells.push(cellId);
            }
          }
        }
      }
    });

    socket.emit("boardConfig", {
      boxSize,
      cellSize,
      paddingHorizontal,
      cellIds,
      colors, // Send the colors array with indicatorCells
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
