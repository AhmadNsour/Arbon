import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {useTheme} from '@theme/ThemeProvider';
import {regexPatterns} from '@utils/regex';

const OTPComponent = ({
  textToShow = 'Enter the OTP sent to your mobile number',
  errorMessage = '',
  onComplete,
  setErrorMessage,
}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleOTPChange = (text, index) => {
    setErrorMessage('');
    if (regexPatterns.otpDigits.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (text && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }

      if (index === 3 && text) {
        const otpValue = newOtp.join('');

        if (otpValue === '0000') {
          setErrorMessage('OTP cannot be 0000. Please enter a valid OTP.');
          setOtp(['', '', '', '']);
          inputRefs.current[0].focus();
        } else {
          onComplete(otpValue);
          setOtp(['', '', '', '']);
          inputRefs.current[0].focus();
        }
      }
    } else if (text === '') {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
    }
  };

  const handleKeyPress = (event, index) => {
    if (event.nativeEvent.key === 'Backspace') {
      const newOtp = [...otp];
      if (!newOtp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
        newOtp[index - 1] = '';
      } else {
        newOtp[index] = '';
      }
      setOtp(newOtp);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{textToShow}</Text>
      <View style={styles.otpContainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={value}
            onChangeText={text => handleOTPChange(text, index)}
            onKeyPress={event => handleKeyPress(event, index)}
            ref={ref => (inputRefs.current[index] = ref)}
            autoFocus={index === 0}
            textContentType="oneTimeCode"
            autoComplete="sms-otp"
            importantForAutofill="yes"
            returnKeyType={index === 3 ? 'done' : 'next'}
            onSubmitEditing={() => {
              if (index < 3) {
                inputRefs.current[index + 1]?.focus();
              } else {
                inputRefs.current[3]?.blur();
              }
            }}
          />
        ))}
      </View>
      {errorMessage && <Text style={styles.errorOTP}>{errorMessage}</Text>}
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
    errorOTP: {
      fontSize: 12,
      color: theme.colors.danger,
      textAlign: 'center',
    },
  });

export default OTPComponent;
