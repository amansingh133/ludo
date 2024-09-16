import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {useSocket} from '../contexts/useSocketContext';
import PlatformLayout from '../components/PlatformLayout';
import {useGame} from '../contexts/useGameContext';

const Game = () => {
  const {socket} = useSocket();
  const {
    boardConfig,
    updateBoardConfig,
    updatePositions,
    updateGameId,
    updateTurn,
  } = useGame();

  useEffect(() => {
    const handleBoardConfig = config => {
      updateTurn(config.turn);
      updateGameId(config.gameId);
      updatePositions(config.positions);
      updateBoardConfig(config);
    };

    socket.on('initBoard', handleBoardConfig);

    return () => {
      socket.off('initBoard', handleBoardConfig);
    };
  }, [socket, updateBoardConfig, updatePositions]);

  if (!boardConfig) return <Text>LOADING</Text>;

  // if (boardConfig) {
  //   console.log(gameId);
  // }

  return <PlatformLayout />;
};

export default Game;
