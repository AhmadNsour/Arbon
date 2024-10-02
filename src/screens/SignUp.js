import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import {useTheme} from '@theme/ThemeProvider';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Popup from '@components/Popup';
import {regexPatterns} from '@utils/regex';
import {getDeviceDetails} from '@utils/deviceInfo';
import logo from '@assets/images/logoWhite.png';

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
  const [sanadPopupVisible, setSanadPopupVisible] = useState(false);
  const [passwordCriteriaPopupVisible, setPasswordCriteriaPopupVisible] =
    useState(false);

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
    <View style={[styles.container, {paddingBottom: insets.bottom}]}>
      <StatusBar />
      <View style={[styles.topSection, {paddingTop: insets.top}]}>
        <View>
          <Image source={logo} style={styles.logo} />
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Please sign up to continue.</Text>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.inputWrapper}>
            <View style={styles.nationalIdView}>
              <Text style={styles.inputLabel}>National Id</Text>
              <TouchableOpacity
                onPress={() => setSanadPopupVisible(!sanadPopupVisible)}>
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
            <TouchableOpacity
              onPress={() =>
                setPasswordCriteriaPopupVisible(!passwordCriteriaPopupVisible)
              }>
              <Text style={styles.inputLabel}>Password (i)</Text>
            </TouchableOpacity>
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
          </View>

          <View style={styles.inputWrapper}>
            <TouchableOpacity
              onPress={() =>
                setPasswordCriteriaPopupVisible(!passwordCriteriaPopupVisible)
              }>
              <Text style={styles.inputLabel}>Repeat Password (i)</Text>
            </TouchableOpacity>
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
              <Text style={styles.errorText}>
                {repeatedPasswordErrorMessage}
              </Text>
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
            disabled={
              nationalId === '' ||
              nationalId.length < 10 ||
              password === '' ||
              password.length < 8 ||
              repeatedPassword === '' ||
              repeatedPassword.length < 8
            }
            onPress={() => alert('Register')}>
            <Text style={styles.signUpButtonText}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.footer}
            onPress={() => navigation.navigate('login')}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <Text style={styles.signInText}>Sign in</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <Popup
        title="Dear Customer"
        textToShow="Please make sure that you have already registered in SANAD before continuing as your account information will be fetched from your SANAD account"
        visible={sanadPopupVisible}
        cancelButtonText=""
        confirmButtonText="ok"
        onConfirm={() => {
          setSanadPopupVisible(!sanadPopupVisible);
        }}
        showCancelButton={false}
        dismissible={true}
        showCloseIcon={false}
      />
      <Popup
        title="Password Criteria"
        textToShow="A combination of alphabets and numeric, Must be 8-16 Characters, Must have Upper & Lower case character, and Cannot contain spaces or blanks."
        visible={passwordCriteriaPopupVisible}
        cancelButtonText=""
        confirmButtonText="ok"
        onConfirm={() => {
          setPasswordCriteriaPopupVisible(!passwordCriteriaPopupVisible);
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
    topSection: {
      backgroundColor: theme.colors.primary,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      display: 'flex',
      alignItems: 'center',
      marginBottom: 20,
    },
    logo: {
      width: 200,
      height: 150,
      resizeMode: 'contain',
    },
    criteria: {
      marginLeft: 5,
      marginRight: 5,
      fontSize: 12,
      color: theme.colors.text,
    },
  });

export default SignUpScreen;
