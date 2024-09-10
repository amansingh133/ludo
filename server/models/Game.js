import Board from "./board.js";
import { COLOR_CELLS } from "./Cells.js";
import AllGames from "./AllGames.js";

class Game {
  static idCounter = 0;

  constructor() {
    this.id = ++Game.idCounter;
    this._users = [];
    this.board = new Board();
    AllGames.addGame(this);
  }

  get users() {
    return [...this._users];
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
  }

  removeUser(socketId) {
    const index = this._users.findIndex((user) => user.socketId === socketId);
    if (index !== -1) {
      return this._users.splice(index, 1)[0];
    }
    return null;
  }
}

export default Game;
