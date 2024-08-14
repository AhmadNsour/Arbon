import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import logo from '@assets/images/logoWhite.png';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@utils/helpers';

const TopShape = ({color1}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.shape, {backgroundColor: color1}]} />
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 4.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shape: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 4.5,
    borderBottomLeftRadius: 100,
    zIndex: -1,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    marginTop: 50,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default TopShape;
