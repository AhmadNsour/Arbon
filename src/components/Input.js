// src/screens/OTPComponent.js
import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {useTheme} from '../theme/ThemeProvider';

const InputComponent = ({
  label,
  placeholder,
  hint,
  onChange,
  keyboardType,
  maxLength,
}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const [inputValue, setInputValue] = useState('');
  const inputRefs = useRef([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleNationalIdOnChange = value => {
    setErrorMessage('');
    setInputValue(value);
    onChange(value);
  };

  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        keyboardType={keyboardType}
        maxLength={maxLength}
        value={inputValue}
        onChange={value => {
          handleNationalIdOnChange(value);
        }}
      />
      {hint && <Text style={styles.hintText}>{hint}</Text>}
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
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

export default InputComponent;
