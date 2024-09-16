import React, {useEffect, useRef} from 'react';
import {Image} from 'react-native';
import useDeviceInfo from '../hooks/useDeviceInfo';

const Tokens = ({cellImage}) => {
  const {cellSize} = useDeviceInfo();

  return (
    <Image
      source={cellImage}
      style={{width: cellSize, height: cellSize}}
      resizeMode="contain"
    />
  );
};

export default Tokens;
