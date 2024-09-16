import Board from "./BoardModel.js";
import { COLOR_CELLS } from "./CellsModel.js";
import AllGames from "./AllGamesModel.js";

class Game {
  static idCounter = 0;

  constructor() {
    this.id = ++Game.idCounter;
    this._users = [];
    this._board = new Board();
    this._positions = this._initializePositions();
    this._turn = null;
    AllGames.addGame(this);
    AllGames.updateGameQueue(this);
  }

  get users() {
    return [...this._users];
  }

  get board() {
    return this._board;
  }

  get positions() {
    return this._positions;
  }

  get turn() {
    return this._turn;
  }

  updateTurn() {
    if (this.users.length === 0) {
      this._turn = null;
    } else if (!this._turn || !this._users.includes(this._turn)) {
      this._turn = this._users[0];
    }
  }

  addUser(user) {
    if (this._users.length >= 4) {
      throw new Error("Cannot add more than 4 users.");
    }
    this._users.push({
      ...user,
      color:
        Object.keys(COLOR_CELLS)[
          this._users.length % Object.keys(COLOR_CELLS).length
        ],
    });

    AllGames.addUserToGameMap(user.socketId, this);

    this.updateTurn();

    this._positions = this._initializePositions();

    AllGames.updateGameQueue(this);
  }

  removeUser(socketId) {
    const index = this._users.findIndex((user) => user.socketId === socketId);
    if (index !== -1) {
      const removedUser = this._users.splice(index, 1)[0];
      AllGames.removeUserFromGameMap(socketId);

      this.updateTurn();

      AllGames.updateGameQueue(this);

      return removedUser;
    }
    return null;
  }

  _initializePositions() {
    const positions = {};

    const colorToUserId = this._users.reduce((map, user) => {
      map[user.color] = user.id;
      return map;
    }, {});

    for (const color in COLOR_CELLS) {
      positions[color] = COLOR_CELLS[color].spawnCells.map((cellId, index) => ({
        id: index + 1,
        userId: colorToUserId[color] || null,
        cellId,
      }));
    }
    return positions;
  }
}

export default Game;
