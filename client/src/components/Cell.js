import React from 'react';
import {View, StyleSheet} from 'react-native';
import StarIcon from './StarIcon';
import Tokens from './Tokens';
import {IMAGES} from '../constants/constants';
import useDeviceInfo from '../hooks/useDeviceInfo';
import {useGame} from '../contexts/useGameContext';

const Cell = ({cellId, colors}) => {
  const {cellSize} = useDeviceInfo();
  const {positions} = useGame();

  const {
    blackCellMap,
    endingCells,
    starCells,
    indicatorCells,
    spawnCells,
    homeCells,
    startingCells,
  } = colors;

  let cellColor = '#fff';

  if (blackCellMap[cellId]) {
    cellColor = blackCellMap[cellId];
  } else if (endingCells[cellId]) {
    cellColor = endingCells[cellId];
  } else if (starCells[cellId]) {
    cellColor = starCells[cellId];
  } else if (indicatorCells[cellId]) {
    cellColor = indicatorCells[cellId];
  } else if (spawnCells[cellId]) {
    cellColor = spawnCells[cellId];
  } else if (homeCells[cellId]) {
    cellColor = homeCells[cellId];
  } else if (startingCells[cellId]) {
    cellColor = startingCells[cellId];
  }

  let cellImage = null;

  for (const color in positions) {
    const cellInfo = positions[color].find(cell => cell.cellId === cellId);
    if (cellInfo) {
      cellImage = IMAGES[color];
      break;
    }
  }

  return (
    <View
      style={[
        styles.cell,
        {width: cellSize, height: cellSize, backgroundColor: cellColor},
      ]}>
      {cellImage && <Tokens cellImage={cellImage} />}
      {(starCells[cellId] || startingCells[cellId]) && (
        <StarIcon size={cellSize / 1.2} color="black" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Cell;
