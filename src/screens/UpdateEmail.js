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

const UpdateEmailScreen = ({navigation}) => {
  const initialValues = {
    email: 'example@gmail.com',
  };
  const {theme} = useTheme();
  const [email, setEmail] = useState(initialValues.email);

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    const hasChanges = email !== initialValues.email;
    setIsButtonEnabled(hasChanges);
  }, [email, initialValues.email]);

  const saveEmail = () => {
    if (Platform.OS === 'android') {
      ToastAndroid.show('Email has been updated!', ToastAndroid.SHORT);
    } else {
      Alert.alert('Email has been updated!');
    }
    navigation.goBack();
  };

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>Email address</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={theme.colors.darkGrayishViolet}
      />
      <TouchableOpacity
        style={
          isButtonEnabled ? styles.saveButtonEnabled : styles.saveButtonDisabled
        }
        onPress={saveEmail}
        disabled={!isButtonEnabled}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
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
    input: {
      height: 60,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 10,
      color: theme.colors.text,
      padding: 20,
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
  });

export default UpdateEmailScreen;
