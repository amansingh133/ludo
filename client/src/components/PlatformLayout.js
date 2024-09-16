import React from 'react';
import {View, Text} from 'react-native';
import Board from './Board';
import Dice from './Dice';
import {STYLES} from '../constants/constants';
import useDeviceInfo from '../hooks/useDeviceInfo';
import {useGame} from '../contexts/useGameContext';

const PlatformLayout = () => {
  const {boxSize, paddingHorizontal, deviceInfo} = useDeviceInfo();
  const {users} = useGame();

  const MOBILESTYLES = [
    STYLES.horizontalDiceContainer,
    {height: boxSize, width: boxSize},
  ];

  const WEBSTYLES = [STYLES.verticalDiceContainer, {height: boxSize}];

  return (
    <View
      style={[
        STYLES.overlayContainer,
        {
          height: boxSize,
          flexDirection: deviceInfo.platform === 'web' ? 'row' : 'column',
        },
        deviceInfo.platform === 'web' && {marginHorizontal: 'auto'},
        deviceInfo.platform === 'web' && {width: 'auto'},
      ]}>
      <View
        style={deviceInfo.platform === 'android' ? MOBILESTYLES : WEBSTYLES}>
        <Dice user={users[1]} diceId={users[1].id} />
        {deviceInfo.platform === 'android' ? (
          <Dice user={users[2]} diceId={users[2].id} />
        ) : (
          <Dice user={users[0]} diceId={users[0].id} />
        )}
        {/* <Dice user={users[0]} />
        <Dice user={users[0]} /> */}
      </View>
      <View
        style={[
          STYLES.boardContainer,
          {
            width: boxSize,
            height: boxSize,
            marginHorizontal: paddingHorizontal,
          },
        ]}>
        <Board />
      </View>
      <View
        style={deviceInfo.platform === 'android' ? MOBILESTYLES : WEBSTYLES}>
        {deviceInfo.platform === 'android' ? (
          <Dice user={users[0]} diceId={users[0].id} />
        ) : (
          <Dice user={users[2]} diceId={users[2].id} />
        )}
        <Dice user={users[3]} diceId={users[3].id} />
        {/* <Dice user={users[0]} />
        <Dice user={users[0]} /> */}
      </View>
    </View>
  );
};

export default PlatformLayout;
