import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {useTheme} from '../theme/ThemeProvider';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import OTPComponent from '../components/OTPComponent';

const OTPScreen = ({navigation}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();
  const [errorMessage, setErrorMessage] = useState('');

  const callOTPApi = async otpValue => {
    Alert.alert('Success', otpValue);
  };
  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <OTPComponent
        errorMessage={errorMessage}
        onComplete={value => {
          callOTPApi(value);
        }}
        setErrorMessage={setErrorMessage}
      />
    </View>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 16,
      color: theme.colors.text,
      marginBottom: 20,
      textAlign: 'center',
    },
    otpContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    otpInput: {
      width: 60,
      height: 60,
      margin: 5,
      backgroundColor: theme.colors.white,
      borderRadius: 10,
      textAlign: 'center',
      fontSize: 18,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 4,
    },
    incorrectOTP: {
      fontSize: 12,
      color: theme.colors.danger,
      textAlign: 'center',
    },
  });

export default OTPScreen;
