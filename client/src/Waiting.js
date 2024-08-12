import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Waiting = ({route, navigation}) => {
  const {socket, users} = route.params;
  const [userList, setUserList] = useState(users);

  useEffect(() => {
    const handleUserListUpdate = updatedUsers => {
      setUserList(updatedUsers);
    };

    const handleStartGame = () => {
      if (userList.length === 4) {
        navigation.navigate('Game', {socket: socket, users: userList});
      }
    };

    socket.on('userList', handleUserListUpdate);
    socket.on('startGame', handleStartGame);
    return () => {
      socket.off('userList', handleUserListUpdate);
      socket.off('startGame', handleStartGame);
    };
  }, [socket, userList, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Waiting for other players...</Text>
      {userList.length === 0 ? (
        <Text>No users online</Text>
      ) : (
        userList.map((user, index) => (
          <Text key={index} style={styles.user}>
            {user.name}
          </Text>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  user: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default Waiting;
