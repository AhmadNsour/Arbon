import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import OTPComponent from '@components/OTPComponent';
import {useTheme} from '@theme/ThemeProvider';
import {regexPatterns} from '@utils/regex';

const ResetPasswordScreen = ({navigation}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();
  const [nationalId, setNationalId] = useState('');
  const [step, setStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [nationalIdErrorMessage, setNationalIdErrorMessage] = useState('');

  const handleResetPassword = otp => {
    if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      console.log(otp);
      navigation.navigate('login');
      alert('Password reset successfully!');
    }
  };

  const handleNationalIdOnChange = value => {
    if (regexPatterns.digits.test(value) || value === '') {
      setNationalId(value);
      setNationalIdErrorMessage('');
    } else {
      setNationalIdErrorMessage('National ID can only contain digits.');
    }
  };

  const handleNationalIdBlur = () => {
    if (nationalId.length < 10) {
      setNationalIdErrorMessage('National ID must be at least 10 digits long.');
    } else {
      setNationalIdErrorMessage('');
    }
  };

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom}]}>
      {step === 0 ? (
        <>
          <Text style={styles.title}>
            From here you can reset your password that you use to authenticate
            your self.
          </Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your national Identity"
              keyboardType="numeric"
              value={nationalId}
              maxLength={10}
              onChangeText={value => {
                handleNationalIdOnChange(value);
              }}
              onBlur={handleNationalIdBlur}
            />
            {nationalIdErrorMessage && (
              <Text style={styles.errorText}>{nationalIdErrorMessage}</Text>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={
                nationalId === '' || nationalId.length < 10
                  ? styles.resetButtonDisabled
                  : styles.resetButton
              }
              disabled={nationalId === '' || nationalId.length < 10}
              onPress={() => handleResetPassword()}>
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <OTPComponent
          errorMessage={errorMessage}
          onComplete={value => handleResetPassword(value)}
          setErrorMessage={setErrorMessage}
        />
      )}
    </View>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 20,
    },
    title: {
      fontSize: 16,
      color: theme.colors.text,
      marginBottom: 20,
    },
    inputWrapper: {
      marginVertical: 10,
    },
    inputLabel: {
      fontSize: 14,
      color: theme.colors.text,
      marginBottom: 5,
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: 15,
      backgroundColor: theme.colors.white,
      borderRadius: 10,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 4,
    },
    errorText: {
      color: theme.colors.danger,
      marginTop: 5,
      fontSize: 12,
    },
    buttonContainer: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    resetButton: {
      width: '100%',
      padding: 15,
      backgroundColor: theme.colors.primary,
      borderRadius: 10,
      alignItems: 'center',
      marginVertical: 20,
    },
    resetButtonDisabled: {
      width: '100%',
      padding: 15,
      backgroundColor: theme.colors.darkGrayishViolet,
      borderRadius: 10,
      alignItems: 'center',
      marginVertical: 20,
    },
    resetButtonText: {
      color: theme.colors.white,
      fontWeight: 'bold',
      fontSize: 16,
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    backToLoginText: {
      color: theme.colors.primary,
      fontWeight: 'bold',
    },
  });

export default ResetPasswordScreen;
