// src/screens/LoginScreen.js
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {useTheme} from '../theme/ThemeProvider';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TopShape from '../components/TopShape';

const {height} = Dimensions.get('window');

const LoginScreen = ({navigation}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();
  const [faceIDEnabled, setFaceIDEnabled] = useState(true);

  const dynamicMarginTop =
    height > 800 ? (faceIDEnabled ? 100 : 0) : faceIDEnabled ? 50 : 0;
  const handleFaceIDLogin = () => {
    alert('Face ID login initiated');
  };
  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <TopShape color1={theme.colors.primary} />
      <View style={[styles.content, {marginTop: dynamicMarginTop}]}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Please sign in to continue.</Text>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your mobile number"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
          />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => alert('Login')}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footer}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <Text style={styles.signUpText}>Sign up</Text>
        </TouchableOpacity>

        {faceIDEnabled && (
          <>
            <Text style={styles.orText}>OR</Text>
            <TouchableOpacity
              style={styles.faceIDWrapper}
              onPress={handleFaceIDLogin}>
              <Image
                source={require('../assets/images/faceId.png')} // Ensure this path is correct and the icon is available
                style={styles.faceIDIcon}
              />
              <Text style={styles.faceIDTitle}>Sign-in with Biometric</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
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
    forgotPassword: {
      marginVertical: 10,
      color: theme.colors.primary,
      fontWeight: 'bold',
      textAlign: 'right',
    },
    loginButton: {
      width: '100%',
      padding: 15,
      backgroundColor: theme.colors.primary,
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
      marginVertical: 20,
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
  });

export default LoginScreen;
