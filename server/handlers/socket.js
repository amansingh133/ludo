import { addUserInGame, removeUserFromGame } from "../controllers/users.js";

const setUpSocketEvents = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    socket.on("addUser", (data) => addUserInGame(data, socket, io));
    socket.on("disconnect", () => removeUserFromGame(socket, io));

    // socket.on("createBoard", ({ width }) => {
    //   const paddingHorizontal = width * 0.05;
    //   const boxSize = width * 0.9;
    //   const cellSize = boxSize / 15;

    //   cellIds.length = 0;

    //   for (let row = 0; row < 15; row++) {
    //     for (let col = 0; col < 15; col++) {
    //       cellIds.push(`${row}-${col}`);
    //     }
    //   }

    //   socket.emit("boardConfig", {
    //     boxSize,
    //     cellSize,
    //     paddingHorizontal,
    //     cellIds,
    //     colors,
    //     blackCells: blackCellMap,
    //   });
    // });
  });
};

export default setUpSocketEvents;
