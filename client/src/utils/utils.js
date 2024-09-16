export const processCells = (colorCells, blackCells, safeCells) => {
  const indicatorCells = {};
  const spawnCells = {};
  const homeCells = {};
  const startingCells = {};
  const starCells = {};
  const endingCells = {};
  const blackCellMap = {};

  Object.keys(colorCells).forEach(color => {
    const {
      indicatorCells: indicator,
      spawnCells: spawn,
      homeCells: home,
      startingCells: start,
      starCells: stars,
      endingCells: ends,
    } = colorCells[color];

    indicator.forEach(cellId => {
      indicatorCells[cellId] = color;
    });
    spawn.forEach(cellId => {
      spawnCells[cellId] = color;
    });
    home.forEach(cellId => {
      homeCells[cellId] = color;
    });
    start.forEach(cellId => {
      startingCells[cellId] = color;
    });
    stars.forEach(cellId => {
      starCells[cellId] = color;
    });
    ends.forEach(cellId => {
      endingCells[cellId] = color;
    });
  });

  blackCells.forEach(cellId => {
    blackCellMap[cellId] = 'black';
  });
  // safeCells.forEach(cellId => {
  //   safeCellMap[cellId] = 'safe';
  // });

  return {
    indicatorCells,
    spawnCells,
    homeCells,
    startingCells,
    starCells,
    endingCells,
    blackCellMap,
    // safeCellMap,
  };
};
