const AllGames = new Set();

const availableGame = () => {
  for (const game of AllGames) {
    if (game.users.length < 4) {
      return game;
    }
  }
  return null;
};

const addGame = (game) => {
  AllGames.add(game);
};

const removeGame = (game) => {
  AllGames.delete(game);
};

const getAllGames = () => {
  return AllGames;
};

export default { availableGame, addGame, removeGame, getAllGames };
