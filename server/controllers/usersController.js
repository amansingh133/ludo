import User from "../models/UserModel.js";
import Game from "../models/GameModel.js";
import AllGames from "../models/AllGamesModel.js";
import { initBoard } from "./gameController.js";

let userId = 1;

export const addUserInGame = (data, socket, io) => {
  const newUser = new User(userId++, data.name, socket.id);

  let game = AllGames.availableGame();

  if (!game) {
    game = new Game();
  }

  game.addUser(newUser.userDetails);

  socket.join(`game-${game.id}`);

  const usersInGame = game.users.map((user) => ({
    id: user.id,
    name: user.name,
    color: user.color,
  }));

  io.to(`game-${game.id}`).emit("userList", usersInGame);

  //for development

  if (usersInGame.length >= 4) {
    setTimeout(() => {
      io.to(`game-${game.id}`).emit("startGame", usersInGame);

      initBoard(io, game);
    }, 500);
  }

  // if (usersInGame.length === 4) {
  //   setTimeout(() => {
  //     io.to(`game-${game.id}`).emit("startGame", usersInGame);

  //     initBoard(data.width, io, game);
  //   }, 500);
  // }
};

export const removeUserFromGame = (socket, io) => {
  console.log("A user disconnected", socket.id);

  const game = AllGames.getGameBySocketId(socket.id);

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
