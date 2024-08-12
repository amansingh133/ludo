import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

const Game = ({route}) => {
  const {users, socket} = route.params;
  const {width} = Dimensions.get('window');
  const [boardConfig, setBoardConfig] = useState(null);

  useEffect(() => {
    // Emit createBoard event with width when the component mounts
    socket.emit('createBoard', {width});

    const handleBoardConfig = config => {
      setBoardConfig(config);
    };

    socket.on('boardConfig', handleBoardConfig);

    return () => {
      socket.off('boardConfig', handleBoardConfig);
    };
  }, [socket, width]);

  if (!boardConfig) return null;

  const {boxSize, cellSize, paddingHorizontal, colors} = boardConfig;

  // Convert colors array to a map for easier lookup
  const indicatorCells = {};
  colors.forEach(({color, indicatorCells: cells}) => {
    cells.forEach(cellId => {
      indicatorCells[cellId] = color;
    });
  });

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.box,
          {
            width: boxSize,
            height: boxSize,
            marginHorizontal: paddingHorizontal,
          },
        ]}>
        {Array.from({length: 15}).map((_, rowIndex) => (
          <View key={rowIndex} style={{flexDirection: 'row', flex: 1}}>
            {Array.from({length: 15}).map((_, colIndex) => {
              const cellId = `${rowIndex}-${colIndex}`;
              const cellColor = indicatorCells[cellId] || '#fff'; // Default color
              return (
                <View
                  key={cellId} // Use cellId as key for better identification
                  style={[
                    styles.cell,
                    {
                      width: cellSize,
                      height: cellSize,
                      backgroundColor: cellColor,
                    },
                  ]}
                />
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  box: {
    backgroundColor: '#fff',
    borderColor: 'black',
    borderWidth: 2,
    flexDirection: 'column',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  cell: {
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default Game;
