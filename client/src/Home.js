import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {io} from 'socket.io-client';

const Home = ({navigation}) => {
  const [name, setName] = useState('');
  const [socket, setSocket] = useState(null);

  const handlePress = () => {
    if (name.trim() === '') {
      Alert.alert('Error : ', 'Name cannot be empty');
      return;
    }

    const newSocket = io('http://192.168.1.4:5000/');

    newSocket.on('connect', () => {
      newSocket.emit('addUser', name);

      newSocket.on('userList', userList => {
        navigation.navigate('Waiting', {socket: newSocket, users: userList});
      });
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });
    setSocket(newSocket);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <Button title="Play" onPress={handlePress} />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default Home;
