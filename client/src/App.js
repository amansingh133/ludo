import React from 'react';
import {SocketProvider} from './contexts/useSocketContext';
import {GameProvider} from './contexts/useGameContext';
import AppNavigator from './navigation/navigator';

const App = () => {
  return (
    <SocketProvider>
      <GameProvider>
        <AppNavigator />
      </GameProvider>
    </SocketProvider>
  );
};

export default App;
