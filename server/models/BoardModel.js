import { COLOR_CELLS, BLACK_CELLS } from "./CellsModel.js";

class Board {
  static idCounter = 0;

  constructor() {
    Object.defineProperty(this, "_boardData", {
      value: {
        id: ++Board.idCounter,
        colorCells: COLOR_CELLS,
        blackCells: BLACK_CELLS,
        safeCells: [],
        cellIds: this.generateCellIds(),
      },
      writable: false,
      configurable: false,
      enumerable: false,
    });

    this.updateSafeCells();
  }

  generateCellIds() {
    return Array.from(
      { length: 225 },
      (_, i) => `${Math.floor(i / 15)}-${i % 15}`
    );
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

  get boardDetails() {
    return {
      id: this._boardData.id,
      colorCells: this._boardData.colorCells,
      blackCells: this._boardData.blackCells,
      safeCells: this._boardData.safeCells,
      cellIds: this._boardData.cellIds,
    };
  }
}

export default Board;
