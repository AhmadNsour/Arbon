import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {CommonActions} from '@react-navigation/native';
import Popup from '@components/Popup';
import {useTheme} from '@theme/ThemeProvider';
import {regexPatterns} from '@utils/regex';
import {useSelector} from 'react-redux';
import logo from '@assets/images/logoWhite.png';

const LoginScreen = ({navigation}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();
  const [nationalId, setNationalId] = useState('');
  const [NationalIdErrorMessage, setNationalIdErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const inputRefs = useRef([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const faceIdEnabled = useSelector(state => state.settings.faceIdEnabled);

  const handleCancel = () => {
    setPopupVisible(false);
  };

  const handleConfirm = () => {
    setPopupVisible(false);
  };
  const handleFaceIDLogin = () => {
    alert('Face ID login initiated');
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
    setPasswordErrorMessage('');
    setPassword(value);
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

  const handlePasswordKeyPress = event => {
    if (event.nativeEvent.key === 'v' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
    }
  };

  const clearValuesAndNavigate = route => {
    setNationalId('');
    setPassword('');
    setPasswordErrorMessage('');
    setNationalIdErrorMessage('');
    navigation.navigate(route);
  };

  const handleLogin = async () => {
    if (
      nationalId === '' ||
      nationalId.length < 10 ||
      password === '' ||
      password.length < 8
    ) {
      alert('Please fill all required fields.');
      return;
    } else {
      navigation.navigate('home');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'home'}],
        }),
      );
      Alert.alert('Login Successfully!');
    }
  };
  useEffect(() => {
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
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Please sign in to continue.</Text>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>National ID</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your national Identity"
            keyboardType="numeric"
            maxLength={10}
            ref={ref => (inputRefs.current = ref)}
            value={nationalId}
            onChangeText={value => {
              handleNationalIdOnChange(value);
            }}
            onBlur={handleNationalIdBlur}
          />

          {NationalIdErrorMessage && (
            <Text style={styles.errorText}>{NationalIdErrorMessage}</Text>
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
        </View>

        <TouchableOpacity
          onPress={() => {
            clearValuesAndNavigate('forgetPassword');
          }}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={
            nationalId === '' ||
            nationalId.length < 10 ||
            password === '' ||
            password.length < 8
          }
          style={
            nationalId === '' ||
            nationalId.length < 10 ||
            password === '' ||
            password.length < 8
              ? styles.loginButtonDisabled
              : styles.loginButtonEnabled
          }
          onPress={() => handleLogin()}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footer}
          onPress={() => {
            clearValuesAndNavigate('signUp');
          }}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
        {faceIdEnabled && (
          <>
            <Text style={styles.orText}>OR</Text>
            <TouchableOpacity
              style={styles.faceIDWrapper}
              onPress={handleFaceIDLogin}>
              <Image
                source={require('@assets/images/faceId.png')}
                style={styles.faceIDIcon}
              />
              <Text style={styles.faceIDTitle}>Sign-in with Biometric</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <Popup
        title="Dear Customer"
        subTitle="Please confirm your choice"
        textToShow="Are you sure you want to delete this device?"
        visible={popupVisible}
        cancelButtonText="Cancel"
        confirmButtonText="Confirm"
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        showCancelButton={true}
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
      marginBottom: 30,
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
    hintText: {
      marginTop: 5,
      fontSize: 12,
      color: theme.colors.text,
    },
    eyeIconWrapper: {
      position: 'absolute',
      right: 15,
    },
    errorText: {
      color: theme.colors.danger,
      marginTop: 5,
      fontSize: 12,
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    forgotPassword: {
      marginVertical: 10,
      color: theme.colors.primary,
      fontWeight: 'bold',
      textAlign: 'right',
    },
    loginButtonEnabled: {
      width: '100%',
      padding: 15,
      backgroundColor: theme.colors.primary,
      borderRadius: 10,
      alignItems: 'center',
      marginVertical: 20,
    },
    loginButtonDisabled: {
      width: '100%',
      padding: 15,
      backgroundColor: theme.colors.darkGrayishViolet,
      borderRadius: 10,
      alignItems: 'center',
      marginVertical: 20,
    },
    loginButtonText: {
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
    signUpText: {
      marginLeft: 5,
      color: theme.colors.primary,
      fontWeight: 'bold',
    },
    orText: {
      textAlign: 'center',
      color: theme.colors.text,
      marginVertical: 30,
    },
    faceIDWrapper: {
      alignItems: 'center',
    },
    faceIDIcon: {
      marginBottom: 20,
      width: 50,
      height: 50,
    },
    faceIDTitle: {
      fontSize: 16,
      color: theme.colors.primary,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    faceIDSubtitle: {
      fontSize: 14,
      color: theme.colors.text,
      textAlign: 'center',
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
  });

export default LoginScreen;
