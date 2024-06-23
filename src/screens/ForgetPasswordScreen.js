// src/screens/ForgetPasswordScreen.js
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useTheme} from '../theme/ThemeProvider';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TopShape from '../components/TopShape'; // Ensure this path is correct

const ForgetPasswordScreen = ({navigation}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();
  const [nationalId, setNationalId] = useState('');

  const handleResetPassword = () => {
    alert('Password reset link sent!');
    // Add logic to handle password reset
  };

  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <View>
        <Text style={styles.title}>
          Enter your National Id to Identify your self.
        </Text>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>National Id</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your national Identity"
            keyboardType="numeric"
            value={nationalId}
            onChangeText={setNationalId}
          />
        </View>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleResetPassword}>
          <Text style={styles.resetButtonText}>Reset</Text>
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
    resetButton: {
      width: '100%',
      padding: 15,
      backgroundColor: theme.colors.primary,
      borderRadius: 10,
      alignItems: 'center',
      marginVertical: 20,
    },
    resetButtonText: {
      color: '#fff',
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

export default ForgetPasswordScreen;
