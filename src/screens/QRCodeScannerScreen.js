import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useTheme} from '@theme/ThemeProvider';
import {decryptData} from '@utils/crypto';

const QRCodeScannerScreen = ({navigation}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  const handleBarCodeRead = ({data}) => {
    try {
      const decryptedData = decryptData(data);
      const userInfo = JSON.parse(decryptedData);
      navigation.navigate('AddConnectionConfirmScreen', userInfo);
    } catch (error) {
      Alert.alert('Invalid QR Code', 'The scanned QR code is not valid.');
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.camera}
        onBarCodeRead={handleBarCodeRead}
        captureAudio={false}>
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Scan the QR code</Text>
        </View>
      </RNCamera>
    </View>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    camera: {
      flex: 1,
    },
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    overlayText: {
      fontSize: 20,
      color: theme.colors.white,
      backgroundColor: theme.colors.primary,
      padding: 10,
      borderRadius: 5,
    },
  });

export default QRCodeScannerScreen;
