import { COLOR_CELLS, BLACK_CELLS } from "./Cells.js";

class Board {
  static idCounter = 0;

  constructor() {
    Object.defineProperty(this, "_boardData", {
      value: {
        id: ++Board.idCounter,
        colorCells: COLOR_CELLS,
        blackCells: BLACK_CELLS,
        safeCells: [],
        cellIds: [],
      },
      writable: false,
      configurable: false,
      enumerable: false,
    });

    this.updateSafeCells();
  }

  updateSafeCells() {
    const cells = new Set();

    Object.values(this._boardData.colorCells).forEach(
      ({ starCells, startingCells, homeCells }) => {
        starCells
          .concat(startingCells, homeCells)
          .forEach((cell) => cells.add(cell));
      }
    );
    this._boardData.safeCells = [...cells];
  }

  get id() {
    return this._boardData.id;
  }

  get colorCells() {
    return this._boardData.colorCells;
  }

  get blackCells() {
    return this._boardData.blackCells;
  }

  get safeCells() {
    return this._boardData.safeCells;
  }

  get cellIds() {
    return this._boardData.cellIds;
  }

  set cellIds(ids) {
    if (Array.isArray(ids)) {
      this._boardData.cellIds = [...ids];
    } else {
      throw new TypeError("cellIds must be an array");
    }
  }
}

export default Board;
