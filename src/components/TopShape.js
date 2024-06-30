import React from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';
import logo from '../assets/images/logoWhite.png';

const {width, height} = Dimensions.get('window');

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
    width: width,
    height: height / 4.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shape: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: width,
    height: height / 4.5,
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
