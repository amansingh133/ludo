const AllGames = new Set();
const availableGameQueue = new Set();
const UserGameMap = new Map();

const availableGame = () => {
  for (const game of availableGameQueue) {
    if (game.users.length < 4) {
      return game;
    }
  }
  return null;
};

const addGame = (game) => {
  AllGames.add(game);
  if (game.users.length < 4) {
    availableGameQueue.add(game);
  }
};

const removeGame = (game) => {
  AllGames.delete(game);
  availableGameQueue.delete(game);
};

const updateGameQueue = (game) => {
  if (game.users.length < 4) {
    availableGameQueue.add(game);
  } else {
    availableGameQueue.delete(game);
  }
};

const addUserToGameMap = (socketId, game) => {
  UserGameMap.set(socketId, game);
};

const removeUserFromGameMap = (socketId) => {
  UserGameMap.delete(socketId);
};

const getGameBySocketId = (socketId) => {
  return UserGameMap.get(socketId);
};

const getAllGames = () => {
  return AllGames;
};

export default {
  availableGame,
  addGame,
  removeGame,
  addUserToGameMap,
  removeUserFromGameMap,
  getGameBySocketId,
  getAllGames,
  updateGameQueue,
};
