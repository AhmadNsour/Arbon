import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {useTheme} from '../theme/ThemeProvider';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TopShape from '../components/TopShape';
import {SCREEN_HEIGHT} from '../utils/helpers';
import {regexPatterns} from '../utils/regex';
import Icon from 'react-native-vector-icons/Ionicons';
import PasswordCriteria from '../components/PasswordCriteria';
import PopupComponent from '../components/PopupComponent';
import {getDeviceDetails} from '../utils/deviceInfo';

const SignUpScreen = ({navigation}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();
  const inputRefs = useRef([]);
  const [nationalId, setNationalId] = useState('');
  const [nationalIdErrorMessage, setNationalIdErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [repeatedPasswordVisible, setRepeatedPasswordVisible] = useState(false);
  const [repeatedPasswordErrorMessage, setRepeatedPasswordErrorMessage] =
    useState('');
  const [popupVisible, setPopupVisible] = useState(false);

  const dynamicMarginTop = SCREEN_HEIGHT > 800 ? 130 : 65;

  const handleNationalIdOnChange = value => {
    if (regexPatterns.digits.test(value) || value === '') {
      setNationalId(value);
      setNationalIdErrorMessage('');
    } else {
      setNationalIdErrorMessage('National ID can only contain digits.');
    }
  };
  const handleNationalIdBlur = () => {
    if (nationalId.length === 0) {
      return;
    }
    if (nationalId.length < 10) {
      setNationalIdErrorMessage('National ID must be 10 digits long.');
    } else {
      setNationalIdErrorMessage('');
    }
  };

  const handlePasswordOnChange = value => {
    if (regexPatterns.noWhiteSpaces.test(value) || value === '') {
      setPasswordErrorMessage('');
      setPassword(value);
    } else {
      setPasswordErrorMessage('Password must not contain white spaces.');
    }
  };

  const handlePasswordBlur = () => {
    if (password.length === 0) {
      return;
    }
    if (password.length < 8) {
      setPasswordErrorMessage('Password must be at least 8 digits long.');
    } else {
      setPasswordErrorMessage('');
    }
  };

  const handleRepeatedPasswordKeyPress = event => {
    if (event.nativeEvent.key === 'v' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
    }
  };

  const handleRepeatedPasswordOnChange = value => {
    if (regexPatterns.noWhiteSpaces.test(value) || value === '') {
      setRepeatedPasswordErrorMessage('');
      setRepeatedPassword(value);
    } else {
      setRepeatedPasswordErrorMessage(
        'Repeated Password must not contain white spaces.',
      );
    }
  };

  const handleRepeatedPasswordBlur = () => {
    if (repeatedPassword.length === 0) {
      return;
    }
    if (password.length < 8) {
      setRepeatedPasswordErrorMessage(
        'Repeated Password must be at least 8 digits long.',
      );
    } else {
      setRepeatedPasswordErrorMessage('');
    }
  };

  const handlePasswordKeyPress = event => {
    if (event.nativeEvent.key === 'v' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
    }
  };
  const getDeviceInfo = async () => {
    var globalDeviceDetails = await getDeviceDetails();
    console.log('Device Details:', globalDeviceDetails);
  };
  useEffect(() => {
    getDeviceInfo();
    if (inputRefs.current) {
      inputRefs.current.focus();
    }
  }, []);
  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <StatusBar barStyle={'light-content'} />
      <TopShape color1={theme.colors.primary} />
      <View style={[styles.content, {marginTop: dynamicMarginTop}]}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Please sign up to continue.</Text>
        <View style={styles.inputWrapper}>
          <View style={styles.nationalIdView}>
            <Text style={styles.inputLabel}>National Id</Text>
            <TouchableOpacity onPress={() => setPopupVisible(!popupVisible)}>
              <Icon
                name="information-circle"
                size={25}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter your National Identity"
            keyboardType="numeric"
            value={nationalId}
            maxLength={10}
            ref={ref => (inputRefs.current = ref)}
            onChangeText={value => {
              handleNationalIdOnChange(value);
            }}
            onBlur={handleNationalIdBlur}
          />
          {nationalIdErrorMessage && (
            <Text style={styles.errorText}>{nationalIdErrorMessage}</Text>
          )}
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry={!passwordVisible}
              value={password}
              autoComplete="password"
              contextMenuHidden={true}
              onChangeText={value => {
                handlePasswordOnChange(value);
              }}
              onBlur={handlePasswordBlur}
              onKeyPress={handlePasswordKeyPress}
            />
            <TouchableOpacity
              style={styles.eyeIconWrapper}
              onPress={() => setPasswordVisible(!passwordVisible)}>
              <Icon
                name={passwordVisible ? 'eye-off' : 'eye'}
                size={25}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
          </View>
          {passwordErrorMessage && (
            <Text style={styles.errorText}>{passwordErrorMessage}</Text>
          )}
          <PasswordCriteria />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Repeat Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your password again"
              secureTextEntry={!repeatedPasswordVisible}
              value={repeatedPassword}
              onChangeText={value => {
                handleRepeatedPasswordOnChange(value);
              }}
              onBlur={handleRepeatedPasswordBlur}
              onKeyPress={handleRepeatedPasswordKeyPress}
            />
            <TouchableOpacity
              style={styles.eyeIconWrapper}
              onPress={() =>
                setRepeatedPasswordVisible(!repeatedPasswordVisible)
              }>
              <Icon
                name={repeatedPasswordVisible ? 'eye-off' : 'eye'}
                size={25}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
          </View>
          {repeatedPasswordErrorMessage && (
            <Text style={styles.errorText}>{repeatedPasswordErrorMessage}</Text>
          )}
        </View>
        <TouchableOpacity
          style={
            nationalId === '' ||
            nationalId.length < 10 ||
            password === '' ||
            password.length < 8 ||
            repeatedPassword === '' ||
            repeatedPassword.length < 8
              ? styles.signUpButtonDisabled
              : styles.signUpButtonEnabled
          }
          onPress={() => alert('Register')}>
          <Text style={styles.signUpButtonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footer}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Text style={styles.signInText}>Sign in</Text>
        </TouchableOpacity>
      </View>
      <PopupComponent
        title="Dear Customer"
        textToShow="Please make sure that you have already registered in SANAD before continuing as your account information will be fetched from your SANAD account"
        visible={popupVisible}
        cancelButtonText=""
        confirmButtonText="ok"
        onConfirm={() => {
          setPopupVisible(!popupVisible);
        }}
        showCancelButton={false}
        dismissible={true}
        showCloseIcon={false}
      />
    </View>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      position: 'relative',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.colors.primary,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      color: theme.colors.text,
      marginBottom: 10,
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
    nationalIdView: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 5,
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
    eyeIconWrapper: {
      position: 'absolute',
      right: 15,
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    hintText: {
      marginTop: 5,
      fontSize: 12,
      color: theme.colors.text,
    },
    signUpButtonEnabled: {
      width: '100%',
      padding: 15,
      backgroundColor: theme.colors.primary,
      borderRadius: 10,
      alignItems: 'center',
      marginVertical: 20,
    },
    signUpButtonDisabled: {
      width: '100%',
      padding: 15,
      backgroundColor: theme.colors.darkGrayishViolet,
      borderRadius: 10,
      alignItems: 'center',
      marginVertical: 20,
    },
    signUpButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    footerText: {
      fontSize: 14,
      color: theme.colors.text,
    },
    signInText: {
      marginLeft: 5,
      color: theme.colors.primary,
      fontWeight: 'bold',
    },
  });

export default SignUpScreen;
