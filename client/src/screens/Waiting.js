import React, {useEffect, useState, useCallback} from 'react';
import {View, Text} from 'react-native';
import commonStyles from '../styles/commonStyles';
import {useSocket} from '../contexts/useSocketContext';
import {useGame} from '../contexts/useGameContext';

const Waiting = ({navigation}) => {
  const {socket} = useSocket();
  const {users, updateUserList} = useGame();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const handleUserListUpdate = allUsers => {
      // console.log(allUsers);
      updateUserList(allUsers);
    };

    const handleStartGame = () => {
      if (!isNavigating) {
        setIsNavigating(true);
        navigation.navigate('Game');
        setIsNavigating(false);
      }
    };

    socket.on('userList', handleUserListUpdate);
    socket.on('startGame', handleStartGame);

    return () => {
      socket.off('userList', handleUserListUpdate);
      socket.off('startGame', handleStartGame);
    };
  }, [socket, users, isNavigating, navigation]);

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Waiting for other players...</Text>
      {users.length === 0 ? (
        <Text>No users online</Text>
      ) : (
        users.map((user, index) => (
          <Text key={user.id} style={commonStyles.user}>
            {user.name}
          </Text>
        ))
      )}
    </View>
  );
};

export default Waiting;
