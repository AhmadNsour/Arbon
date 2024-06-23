// src/components/TopShape.js
import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const TopShape = ({color1}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.shape, {backgroundColor: color1}]} />
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
});

export default TopShape;
