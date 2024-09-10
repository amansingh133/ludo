import React from 'react';
import {Image, StyleSheet} from 'react-native';

const StarIcon = ({size, color}) => (
  <Image
    source={require('../assets/Icons/star-outline.png')} // Adjust the path if needed
    style={[styles.icon, {width: size, height: size, tintColor: color}]}
  />
);

const styles = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
  },
});

export default StarIcon;
