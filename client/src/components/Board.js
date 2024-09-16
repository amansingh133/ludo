import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Cell from './Cell';
import {processCells} from '../utils/utils';
import {IMAGES, STYLES} from '../constants/constants';
import useDeviceInfo from '../hooks/useDeviceInfo';
import {useGame} from '../contexts/useGameContext';

const Board = () => {
  const {boardConfig} = useGame();

  const {
    boardDetails: {colorCells, blackCells, cellIds},
  } = boardConfig;

  const {boxSize, paddingHorizontal} = useDeviceInfo();

  const {
    indicatorCells,
    spawnCells,
    homeCells,
    startingCells,
    starCells,
    endingCells,
    blackCellMap,
  } = processCells(colorCells, blackCells);

  return (
    <View
      style={[
        STYLES.box,
        {
          width: boxSize,
          height: boxSize,
          marginHorizontal: paddingHorizontal,
        },
      ]}>
      {Array.from({length: 15}).map((_, rowIndex) => (
        <View key={rowIndex} style={{flexDirection: 'row', flex: 1}}>
          {Array.from({length: 15}).map((_, colIndex) => {
            const cellIndex = rowIndex * 15 + colIndex;
            const cellId = cellIds[cellIndex];
            return (
              <Cell
                key={cellId}
                cellId={cellId}
                colors={{
                  blackCellMap,
                  endingCells,
                  starCells,
                  indicatorCells,
                  spawnCells,
                  homeCells,
                  startingCells,
                }}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
};

export default Board;
