import React, {useState, useEffect} from 'react';
import {View, TextInput, Pressable, Alert, Text} from 'react-native';
import {io} from 'socket.io-client';
import commonStyles from '../styles/commonStyles';
import useDeviceInfo from '../hooks/useDeviceInfo';
import {useSocket} from '../contexts/useSocketContext';
import {useGame} from '../contexts/useGameContext';

const Home = ({navigation}) => {
  const [name, setName] = useState('');
  const {socket, setSocket} = useSocket();
  const {deviceInfo} = useDeviceInfo();
  const {updateUserList, setCurrentUser} = useGame();

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        socket.emit('addUser', {name});
        socket.on('userList', userList => {
          updateUserList(userList);
          setCurrentUser(userList.find(user => user.name === name));
          navigation.navigate('Waiting');
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

    const newSocket = io(deviceInfo.serverUrl, {
      transports: ['websocket', 'polling'],
    });
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
