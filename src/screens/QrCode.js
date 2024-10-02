import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {useSelector} from 'react-redux';
import {useTheme} from '@theme/ThemeProvider';
import {SCREEN_WIDTH} from '@utils/helpers';
import {encryptData} from '@utils/crypto';

const QRCodeScreen = () => {
  const {theme} = useTheme();
  const user = useSelector(state => state.user);
  const styles = createStyles(theme);

  const qrCodeData = {
    firstName: user?.firstName || 'Ahmad',
    lastName: user?.lastName || 'Al Nsour',
    nationalID: user?.nationalID || '1234567891',
  };
  const encryptedData = encryptData(JSON.stringify(qrCodeData));

  return (
    <View style={styles.container}>
      <View style={styles.qrCodeContainer}>
        <QRCode
          value={encryptedData}
          size={SCREEN_WIDTH * 0.6}
          color={theme.colors.primary}
        />
      </View>
      <Text style={styles.userInfoText}>
        {qrCodeData.firstName} {qrCodeData.lastName}
      </Text>
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
      marginBottom: 30,
      padding: 20,
      backgroundColor: theme.colors.white,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    userInfoText: {
      fontSize: 24,
      color: theme.colors.text,
      marginTop: 10,
      fontWeight: 'bold',
    },
  });

export default QRCodeScreen;
