import React, {useEffect, useState, useCallback} from 'react';
import {View, Text} from 'react-native';
import commonStyles from '../styles/commonStyles';
import {useSocket} from '../hooks/useSocketContext';

const Waiting = ({route, navigation}) => {
  const {users} = route.params;
  const {socket} = useSocket();
  const [userList, setUserList] = useState(users);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleUserListUpdate = useCallback(updatedUsers => {
    setUserList(updatedUsers);
    console.log(userList);
  }, []);

  const handleStartGame = useCallback(() => {
    if (userList.length >= 4 && !isNavigating) {
      setIsNavigating(true);
      navigation.navigate('Game', {socket, users: userList});
    }
  }, [userList, navigation, isNavigating, socket]);

  useEffect(() => {
    socket.on('userList', handleUserListUpdate);
    socket.on('startGame', handleStartGame);

    return () => {
      socket.off('userList', handleUserListUpdate);
      socket.off('startGame', handleStartGame);
    };
  }, [socket, handleUserListUpdate, handleStartGame]);

  useEffect(() => {
    if (userList.length >= 4 && !isNavigating) {
      handleStartGame();
    }
  }, [userList, handleStartGame, isNavigating]);

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Waiting for other players...</Text>
      {userList.length === 0 ? (
        <Text>No users online</Text>
      ) : (
        userList.map((user, index) => (
          <Text key={index} style={commonStyles.user}>
            {user.name}
          </Text>
        ))
      )}
    </View>
  );
};

export default Waiting;
