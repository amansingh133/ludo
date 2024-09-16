import React from 'react';
import {Image} from 'react-native';
import useDeviceInfo from '../hooks/useDeviceInfo';

const StarIcon = () => {
  const {cellSize} = useDeviceInfo();

  const size = cellSize / 1.2;
  const color = 'black';

  return (
    <Image
      source={require('../assets/Icons/star-outline.png')}
      style={[{width: size, height: size}]}
      resizeMode="contain"
      tintColor={color}
    />
  );
};

export default StarIcon;
