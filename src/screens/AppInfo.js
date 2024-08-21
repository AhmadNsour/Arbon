import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {useTheme} from '@theme/ThemeProvider';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '@utils/helpers';

const AppInfoScreen = ({navigation}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  // Application Information
  const appName = DeviceInfo.getApplicationName();
  const appVersion = DeviceInfo.getVersion();
  const buildNumber = DeviceInfo.getBuildNumber();
  const rnVersion = require('react-native/package.json').version;

  // Device Information
  const deviceBrand = DeviceInfo.getBrand();
  const deviceModel = DeviceInfo.getModel();
  const systemName = DeviceInfo.getSystemName();
  const systemVersion = DeviceInfo.getSystemVersion();
  const deviceId = DeviceInfo.getDeviceId();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Application Information</Text>
      <View style={styles.card}>
        <Text style={styles.label}>App Name</Text>
        <Text style={styles.value}>{appName}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Version</Text>
        <Text style={styles.value}>{appVersion}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Build Number</Text>
        <Text style={styles.value}>{buildNumber}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>React Native Version</Text>
        <Text style={styles.value}>{rnVersion}</Text>
      </View>
      {__DEV__ && (
        <View style={styles.card}>
          <Text style={styles.label}>Environment</Text>
          <Text style={styles.value}>
            {__DEV__ ? 'Development' : 'Production'}
          </Text>
        </View>
      )}
      <Text style={styles.header}>Device Information</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Brand</Text>
        <Text style={styles.value}>{deviceBrand}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Model</Text>
        <Text style={styles.value}>{deviceModel}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>OS</Text>
        <Text style={styles.value}>
          {systemName} {systemVersion}
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Version</Text>
        <Text style={styles.value}>{deviceId}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>SCREEN_WIDTH</Text>
        <Text style={styles.value}>{SCREEN_WIDTH}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>SCREEN_HEIGHT</Text>
        <Text style={styles.value}>{SCREEN_HEIGHT}</Text>
      </View>
    </ScrollView>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    header: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.colors.primary,
      marginBottom: 15,
    },
    card: {
      backgroundColor: theme.colors.background,
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
      borderColor: theme.colors.border,
      borderWidth: 1,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    label: {
      fontSize: 16,
      color: theme.colors.text,
      marginBottom: 5,
      fontWeight: '600',
    },
    value: {
      fontSize: 18,
      color: theme.colors.text,
      fontWeight: '400',
    },
    AppInfoCameraIconStyle: {
      marginRight: 10,
    },
  });

export default AppInfoScreen;
