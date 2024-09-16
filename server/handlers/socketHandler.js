import {
  addUserInGame,
  removeUserFromGame,
} from "../controllers/usersController.js";
import {
  diceRolled,
  enableDiceRolling,
} from "../controllers/gameController.js";

const setUpSocketEvents = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    socket.on("addUser", (data) => addUserInGame(data, socket, io));
    socket.on("disconnect", () => removeUserFromGame(socket, io));
    socket.on("enableDiceRoll", () => enableDiceRolling(socket, io));
    socket.on("diceRolled", () => diceRolled(socket, io));
  });
};

export default setUpSocketEvents;
