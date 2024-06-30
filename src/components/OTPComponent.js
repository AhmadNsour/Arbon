// src/screens/OTPComponent.js
import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {useTheme} from '../theme/ThemeProvider';
import {regexPatterns} from '../utils/regex';

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
    // Allow only numeric input and check if text is a single digit
    if (regexPatterns.otpDigits.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      // Move focus to the next input
      if (text && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }

      // Check if the last input field is filled
      if (index === 3 && text) {
        const otpValue = newOtp.join('');

        // Validate that the OTP is not "0000"
        if (otpValue === '0000') {
          setErrorMessage('OTP cannot be 0000. Please enter a valid OTP.');
          // clear the OTP fields and reset focus
          setOtp(['', '', '', '']);
          inputRefs.current[0].focus();
        } else {
          onComplete(otpValue);
          setOtp(['', '', '', '']);
          inputRefs.current[0].focus();
        }
      }
    } else if (text === '') {
      // Handle clearing the input
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
            textContentType="oneTimeCode" // iOS auto-fill hint
            autoComplete="sms-otp" // Android auto-fill hint
            importantForAutofill="yes" // Ensure the field is ready for auto-fill
            returnKeyType={index === 3 ? 'done' : 'next'}
            onSubmitEditing={() => {
              if (index < 3) {
                inputRefs.current[index + 1]?.focus();
              } else {
                inputRefs.current[3]?.blur(); // Dismiss keyboard
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
