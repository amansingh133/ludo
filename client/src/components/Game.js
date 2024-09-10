import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  Button,
  Platform,
} from 'react-native';
import StarIcon from './StarIcon';
import dice1 from '../assets/dice/dice1.png';
import dice2 from '../assets/dice/dice2.png';
import dice3 from '../assets/dice/dice3.png';
import dice4 from '../assets/dice/dice4.png';
import dice5 from '../assets/dice/dice5.png';
import dice6 from '../assets/dice/dice6.png';

const diceImages = {
  1: dice1,
  2: dice2,
  3: dice3,
  4: dice4,
  5: dice5,
  6: dice6,
};

const Game = ({route}) => {
  const {users, socket} = route.params;
  const [boardConfig, setBoardConfig] = useState(null);
  const [diceImage, setDiceImage] = useState(dice1);
  const [currentTurn, setCurrentTurn] = useState(null);
  const [userColor, setUserColor] = useState(null);
  const rollResult = [];
  const [tokenCellIds, setTokenCellIds] = useState({
    red: [],
    blue: [],
    yellow: [],
    green: [],
  });

  const isWeb = Platform.OS === 'web';
  const {width, height} = Dimensions.get('window');
  const dimension = isWeb ? height : width;

  useEffect(() => {
    // Emit createBoard event with width when the component mounts
    socket.emit('createBoard', {width: dimension});
    socket.emit('play');

    const handleBoardConfig = config => {
      setBoardConfig(config);
    };

    socket.on('updateTurn', color => {
      setCurrentTurn(color);
    });

    socket.on('error', message => {
      alert(message);
    });

    const user = users.find(user => user.socketId === socket.id);
    setUserColor(user?.color);

    socket.on('boardConfig', handleBoardConfig);

    return () => {
      socket.off('boardConfig');
      socket.off('updateTurn');
      socket.off('error');
    };
  }, [socket, width, users, userColor, tokenCellIds]);

  if (!boardConfig) return null;

  const {boxSize, cellSize, paddingHorizontal, colors, blackCells} =
    boardConfig;

  const indicatorCells = {};
  const spawnCells = {};
  const homeCells = {};
  const startingCells = {};
  const starCells = {};
  const endingCells = {};
  const blackCellMap = blackCells || {};

  colors.forEach(
    ({
      color,
      indicatorCells: indicator,
      spawnCells: spawn,
      homeCells: home,
      startingCells: start,
      starCells: stars,
      endingCells: ends,
    }) => {
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
    },
  );

  const images = {
    red: require('../assets/tokens/red.png'),
    blue: require('../assets/tokens/blue.png'),
    yellow: require('../assets/tokens/yellow.png'),
    green: require('../assets/tokens/green.png'),
  };

  const positionStyles = {
    red: styles.redPosition,
    green: styles.greenPosition,
    yellow: styles.yellowPosition,
    blue: styles.bluePosition,
  };

  const rollDice = () => {
    if (currentTurn === userColor) {
      socket.emit('diceRoll');
    }
  };

  const updateTokenCellIds = () => {
    const newTokenCellIds = {
      red: [],
      blue: [],
      yellow: [],
      green: [],
    };

    Object.keys(spawnCells).forEach(cellId => {
      const color = spawnCells[cellId];
      if (newTokenCellIds[color]) {
        newTokenCellIds[color].push(cellId);
      }
    });

    setTokenCellIds(newTokenCellIds);
  };
  return (
    <View style={styles.container}>
      {!isWeb && <Text style={styles.title}>Game Board</Text>}
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
              let cellColor = '#fff'; // Default color
              if (blackCellMap[cellId]) {
                cellColor = blackCellMap[cellId]; // Black cells
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
              return (
                <View
                  key={cellId} // Use cellId as key for better identification
                  style={[
                    styles.cell,
                    {
                      width: cellSize,
                      height: cellSize,
                      backgroundColor: cellColor,
                      borderWidth: 1,
                      justifyContent: 'center', // Center items vertically
                      alignItems: 'center', // Center items horizontally
                    },
                  ]}>
                  {spawnCells[cellId] && (
                    <Image
                      source={images[spawnCells[cellId]]}
                      style={{
                        width: cellSize,
                        height: cellSize,
                        resizeMode: 'contain', // Make sure the image fits within the cell
                      }}
                      onLoad={updateTokenCellIds}
                    />
                  )}
                  {(starCells[cellId] || startingCells[cellId]) && (
                    <StarIcon size={cellSize / 1.2} color="black" />
                  )}
                </View>
              );
            })}
          </View>
        ))}
      </View>
      <View style={styles.namesContainer}>
        {users.map(user => (
          <View
            key={user.id}
            style={[
              styles.nameWrapper,
              positionStyles[user.color] || styles.defaultPosition,
            ]}>
            <Text style={styles.nameText}>{user.name}</Text>
          </View>
        ))}
      </View>
      <View style={styles.diceContainer}>
        <Text style={styles.turnText}>
          {currentTurn
            ? `It's ${currentTurn}'s turn`
            : 'Waiting for the game to start...'}
        </Text>
        <Image source={diceImage} style={styles.diceImage} />
        <Button
          title="Roll Dice"
          onPress={rollDice}
          disabled={currentTurn !== userColor}
        />
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
    borderColor: 'black', // Add a default border color
    borderWidth: 1, // Add a default border width
  },
  namesContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  nameWrapper: {
    position: 'absolute',
  },
  redPosition: {
    bottom: 0,
    left: 0,
    marginBottom: 100,
    marginLeft: 250,
  },
  greenPosition: {
    top: 0,
    left: 0,
    marginTop: 100,
    marginLeft: 250,
  },
  yellowPosition: {
    top: 0,
    right: 0,
    marginTop: 100,
    marginRight: 250,
  },
  bluePosition: {
    bottom: 0,
    right: 0,
    marginBottom: 100,
    marginRight: 250,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  defaultPosition: {
    // Default position in case of unexpected color
    bottom: 0,
    left: 0,
  },

  diceContainer: {
    position: 'absolute',
    bottom: 100,
    left: 1000,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  diceImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  turnText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Game;
