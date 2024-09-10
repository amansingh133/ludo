import React, {useState, useEffect} from 'react';
import {View, TextInput, Pressable, Alert, Text} from 'react-native';
import {io} from 'socket.io-client';
import commonStyles from '../styles/commonStyles';
import useServerInfo from '../hooks/useServerInfo';
import {useSocket} from '../hooks/useSocketContext';

const Home = ({navigation}) => {
  const [name, setName] = useState('');
  const {socket, setSocket} = useSocket();
  const {serverUrl} = useServerInfo();

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        socket.emit('addUser', name);
        socket.on('userList', userList => {
          navigation.navigate('Waiting', {users: userList});
        });
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from the server');
      });
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket, name, navigation]);

  const handlePress = () => {
    if (name.trim() === '') {
      Alert.alert('Error : ', 'Name cannot be empty');
      return;
    }

    const newSocket = io(serverUrl);
    setSocket(newSocket);
  };

  return (
    <View style={commonStyles.container}>
      <TextInput
        style={commonStyles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <Pressable style={commonStyles.button} onPress={handlePress}>
        <Text style={commonStyles.buttonText}>PLAY</Text>
      </Pressable>
    </View>
  );
};

export default Home;
