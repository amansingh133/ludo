import User from "../models/User.js";
import Game from "../models/game.js";
import AllGames from "../models/AllGames.js";

let userId = 1;

export const addUserInGame = (name, socket, io) => {
  const newUser = new User(userId++, name, socket.id);

  let game = AllGames.availableGame();

  if (!game) {
    game = new Game();
  }

  game.addUser(newUser.userDetails);

  socket.join(`game-${game.id}`);

  const usersInGame = game.users;

  console.log("Game ID : ", game.id, "User ID : ", usersInGame);

  io.to(`game-${game.id}`).emit("userList", usersInGame);

  if (usersInGame.length === 4) {
    io.to(`game-${game.id}`).emit("startGame", usersInGame);
  }
};

export const removeUserFromGame = (socket, io) => {
  console.log("A user disconnected", socket.id);

  const allGames = AllGames.getAllGames();

  const game = Array.from(allGames).find((game) =>
    game.users.some((user) => user.socketId === socket.id)
  );

  if (game) {
    const removedUser = game.removeUser(socket.id);

    if (removedUser) {
      console.log(`User ${socket.id} removed from game ${game.id}`);

      io.to(`game-${game.id}`).emit("userList", game.users);

      if (game.users.length === 0) {
        AllGames.removeGame(game);
        console.log(`Game ${game.id} removed as it is now empty`);
      }
    }
  } else {
    console.log(`No game found for user ${socket.id}`);
  }
};
