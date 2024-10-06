import React, {useRef} from 'react';
import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {useSelector} from 'react-redux';
import {useTheme} from '@theme/ThemeProvider';
import {SCREEN_WIDTH} from '@utils/helpers';
import {encryptData} from '@utils/crypto';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';

const QRCodeScreen = () => {
  const {theme} = useTheme();
  const user = useSelector(state => state.user);
  const styles = createStyles(theme);
  const viewShotRef = useRef();

  const qrCodeData = {
    firstName: user?.firstName || 'Ahmad',
    lastName: user?.lastName || 'Al Nsour',
    nationalID: user?.nationalID || '1234567891',
  };
  const encryptedData = encryptData(JSON.stringify(qrCodeData));

  const shareQRCode = () => {
    viewShotRef.current
      .capture()
      .then(uri => {
        RNFS.readFile(uri, 'base64').then(base64Image => {
          const shareOptions = {
            title: 'Share Account Information',
            message: 'Here is my Arbon Account QR code!',
            url: `data:image/png;base64,${base64Image}`,
            type: 'image/png',
          };
          Share.open(shareOptions)
            .then(() => Alert.alert('Shared Successfully!'))
            .catch(() => {
              return;
            });
        });
      })
      .catch(err => {
        Alert.alert('Error', 'Failed to capture QR code.');
        console.error('ViewShot Error:', err);
      });
  };

  return (
    <View style={styles.container}>
      <ViewShot ref={viewShotRef} options={{format: 'png', quality: 0.9}}>
        <View style={styles.qrCodeContainer}>
          <QRCode
            value={encryptedData}
            size={SCREEN_WIDTH * 0.6} // Keep the QR code size
            color="#000"
            ecl="L"
            // Add margin to make the white area smaller
            quietZone={5}
          />
        </View>
        <Text style={styles.userInfoText}>
          {qrCodeData.firstName} {qrCodeData.lastName}
        </Text>
      </ViewShot>
      <TouchableOpacity style={styles.shareButton} onPress={shareQRCode}>
        <Text style={styles.shareButtonText}>Share Account Information</Text>
      </TouchableOpacity>
    </View>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    qrCodeContainer: {
      padding: 20,
      backgroundColor: theme.colors.white,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    userInfoText: {
      fontSize: 24,
      color: theme.colors.text,
      marginTop: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    shareButton: {
      marginTop: 20,
      backgroundColor: theme.colors.primary,
      width: '100%',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 10,
    },
    shareButtonText: {
      color: theme.colors.white,
      fontSize: 16,
    },
  });

export default QRCodeScreen;
