import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ToastAndroid,
  Platform,
} from 'react-native';
import {useTheme} from '@theme/ThemeProvider';
import {validateInput} from '@utils/regex';

const UpdateEmailScreen = ({navigation}) => {
  const initialValues = {
    email: 'example@gmail.com',
  };
  const {theme} = useTheme();
  const [email, setEmail] = useState(initialValues.email);
  const [emailError, setEmailError] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const styles = createStyles(theme);

  useEffect(() => {
    const hasChanges = email !== initialValues.email;
    const isValid =
      validateInput('email', email) && validateInput('noWhiteSpaces', email);
    setIsButtonEnabled(hasChanges && isValid);
  }, [email, initialValues.email]);

  const handleEmailChange = value => {
    setEmail(value.trim());

    if (value.trim() === initialValues.email) {
      setEmailError('');
      return;
    }
    if (!validateInput('email', value)) {
      setEmailError('Please enter a valid email address.');
    } else if (!validateInput('noWhiteSpaces', value)) {
      setEmailError('Email address cannot contain spaces.');
    } else {
      setEmailError('');
    }
  };

  const saveEmail = () => {
    if (Platform.OS === 'android') {
      ToastAndroid.show('Email has been updated!', ToastAndroid.SHORT);
    } else {
      Alert.alert('Email has been updated!');
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        From here you can change the email address that Arbon will use to
        communicate with you
      </Text>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Current Email address</Text>
        <TextInput
          readOnly
          style={styles.input}
          placeholder="Email"
          value={initialValues.email}
          placeholderTextColor={theme.colors.darkGrayishViolet}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>New Email address</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={handleEmailChange}
          placeholderTextColor={theme.colors.darkGrayishViolet}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={
            isButtonEnabled
              ? styles.saveButtonEnabled
              : styles.saveButtonDisabled
          }
          onPress={saveEmail}
          disabled={!isButtonEnabled}>
          <Text style={styles.saveButtonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: 16,
      color: theme.colors.text,
      marginBottom: 20,
    },
    input: {
      height: 60,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 10,
      color: theme.colors.text,
      padding: 20,
    },
    buttonContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 20,
    },
    saveButtonEnabled: {
      backgroundColor: theme.colors.primary,
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
      opacity: 1,
    },
    saveButtonDisabled: {
      backgroundColor: theme.colors.darkGrayishViolet,
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
      opacity: 0.5,
    },
    saveButtonText: {
      color: theme.colors.white,
      fontSize: 16,
    },
    inputLabel: {
      fontSize: 14,
      color: theme.colors.text,
      marginBottom: 5,
      fontWeight: 'bold',
    },
    inputWrapper: {
      marginVertical: 10,
    },
    errorText: {
      color: theme.colors.danger,
      marginTop: 5,
      fontSize: 12,
    },
  });

export default UpdateEmailScreen;
