import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import logo from '@assets/images/logoWhite.png';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@utils/helpers';

const TopShape = ({color1}) => {
  return (
    <View style={[styles.container, {backgroundColor: color1}]}>
      <Image source={logo} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 4.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 100,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default TopShape;
