import AllGamesModel from "../models/AllGamesModel.js";

const findGame = (socket) => {
  const game = AllGamesModel.getGameBySocketId(socket.id);

  if (!game) {
    console.error(`Game for socket ${socket.id} not found`);
    return;
  }

  return game;
};

export const initBoard = (io, game) => {
  if (!game) {
    console.error(`Game with ID ${game.id} not found.`);
    return;
  }

  setTimeout(() => {
    io.to(`game-${game.id}`).emit("initBoard", {
      boardDetails: game.board.boardDetails,
      gameId: game.id,
      positions: game.positions,
      turn: game.turn.id,
    });
  }, 500);
};

export const enableDiceRolling = (socket, io) => {
  console.log("enableDiceRolling triggered");
  const game = findGame(socket);

  io.to(`game-${game.id}`).emit("enableDiceRoll", { turn: game.turn.id });
};

export const diceRolled = (socket, io) => {
  console.log("Dice rolled triggered");

  const game = findGame(socket);

  const currentPlayer = game.turn;

  if (currentPlayer.socketId !== socket.id) {
    console.log(`User ${socket.id} attempted to roll the dice out of turn.`);
    return;
  } else {
    console.log(`User ${game.turn.name} rolled the dice`);
  }

  const diceValue = Math.floor(Math.random() * 6) + 1;

  io.to(`game-${game.id}`).emit("diceValue", {
    userId: currentPlayer.id,
    diceValue,
    rolledSix: diceValue === 6,
  });
};
