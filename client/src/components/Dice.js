import React, {useEffect, useState} from 'react';
import {Image, Text, View, Pressable} from 'react-native';
import {IMAGES, STYLES} from '../constants/constants';
import commonStyles from '../styles/commonStyles';
import {useGame} from '../contexts/useGameContext';
import {useSocket} from '../contexts/useSocketContext';

const Dice = ({user, diceId}) => {
  const {socket} = useSocket();
  const {turn, currentUser, updateTurn} = useGame();
  const [diceImage, setDiceImage] = useState(1);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (turn && diceId) {
      const isMyTurn = diceId === turn;
      setDisabled(!isMyTurn);
    }
  }, [turn, diceId, user]);

  const handleDiceRoll = () => {
    if (!disabled && currentUser.id === user.id) {
      console.log(`${user.id} rolled the dice`);
      socket.emit('diceRolled');
    } else {
      console.log(`It's not ${user.id}'s turn`);
    }
  };

  useEffect(() => {
    socket.on('diceValue', data => {
      console.log('Value', data.diceValue);
      if (turn === diceId) {
        setDiceImage(data.diceValue);
      }
      setDisabled(true);
    });

    return () => {
      socket.off('diceValue');
    };
  }, [socket]);

  // useEffect(() => {
  //   if (!user || !currentUser) return;

  //   if (turn === diceId) {
  //     socket.emit('enableDiceRoll');
  //   }

  //   const hanldleEnableDiceRoll = data => {
  //     updateTurn(data.turn);
  //     if (data.turn === currentUser.id) {
  //       setIsDiceEnabled(true);
  //     } else {
  //       setIsDiceEnabled(false);
  //     }
  //   };

  //   const handleDiceRolled = data => {
  //     if (turn === diceId) {
  //       setIsDiceEnabled(false);
  //       console.log(isDiceEnabled);

  //       console.log('returned', data.diceValue);
  //       setDiceImage(data.diceValue);
  //     }
  //   };

  //   socket.on('enableDiceRoll', hanldleEnableDiceRoll);
  //   socket.on('diceRolled', handleDiceRolled);

  //   return () => {
  //     socket.off('enableDiceRoll', hanldleEnableDiceRoll);
  //     socket.off('diceRolled', handleDiceRolled);
  //   };
  // }, [socket, updateTurn, currentUser, isDiceEnabled, turn, diceId]);

  // const handleDiceRoll = () => {
  //   if (
  //     currentUser &&
  //     currentUser.id === turn &&
  //     isDiceEnabled &&
  //     turn === diceId
  //   ) {
  //     console.log(`${user.name} rolled the dice`);
  //     socket.emit('diceRolled');
  //   } else {
  //     console.log(`It's not ${currentUser.name}'s turn`);
  //   }
  // };

  // const disabled = user.id !== turn || !isDiceEnabled;

  if (!user) return <Text>LOADING</Text>;

  return (
    <View>
      <Text style={commonStyles.user}>{user.name}</Text>
      <Pressable
        style={[STYLES.imageContainer, disabled && STYLES.disabledDice]}
        onPress={handleDiceRoll}
        disabled={disabled}>
        <Image
          source={IMAGES[`dice${diceImage}`]}
          style={STYLES.image}
          resizeMode="contain"
        />
      </Pressable>
    </View>
  );
};

export default Dice;
