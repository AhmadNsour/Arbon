// src/screens/SignUpScreen.js
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useTheme} from '../theme/ThemeProvider';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TopShape from '../components/TopShape';

const {height} = Dimensions.get('window');

const SignUpScreen = ({navigation}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();

  const dynamicMarginTop = height > 800 ? 100 : 50;

  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <TopShape color1={theme.colors.primary} />
      <View style={[styles.content, {marginTop: dynamicMarginTop}]}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Please sign up to continue.</Text>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>National Id</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your National Identity"
            keyboardType="numeric"
          />
        </View>

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

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Repeat Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password again"
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={styles.signUpButton}
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
    signUpButton: {
      width: '100%',
      padding: 15,
      backgroundColor: theme.colors.primary,
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
