import React, {createContext, useContext, useState, useMemo} from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({children}) => {
  const [boardConfig, setBoardConfig] = useState(null);
  const [users, setUsers] = useState([]);
  const [gameId, setGameId] = useState(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [turn, setTurn] = useState(null);
  const [positions, setPositions] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentDiceValue, setCurrentDiceValue] = useState([]);
  const [diceState, setDiceState] = useState(true);

  const value = useMemo(
    () => ({
      boardConfig,
      users,
      gameId,
      isGameStarted,
      turn,
      positions,
      currentUser,
      currentDiceValue,
      diceState,
      updateBoardConfig: setBoardConfig,
      updateUserList: setUsers,
      updateGameId: setGameId,
      startGame: () => setIsGameStarted(true),
      updateTurn: setTurn,
      updatePositions: setPositions,
      setCurrentUser,
      setCurrentDiceValue,
      setDiceState,
    }),
    [boardConfig, users, isGameStarted, currentUser, turn],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
