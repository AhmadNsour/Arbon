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
import {useTheme} from '../theme/ThemeProvider';

const UpdateProfileScreen = ({navigation}) => {
  const initialValues = {
    fullName: 'Ahmad Nsour',
    nationalId: '1234567890',
    mobileNumber: '0797433919',
    email: 'ahmadmhnsour@gmail.com',
    dateOfBirth: '12/08/1993',
  };
  const {theme} = useTheme(); // Access the current theme
  const [fullName, setFullName] = useState(initialValues.fullName);
  const [nationalId, setNationalId] = useState(initialValues.nationalId);
  const [mobileNumber, setMobileNumber] = useState(initialValues.mobileNumber);
  const [email, setEmail] = useState(initialValues.email);
  const [dateOfBirth, setDateOfBirth] = useState(initialValues.dateOfBirth);

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    const hasChanges =
      fullName !== initialValues.fullName ||
      nationalId !== initialValues.nationalId ||
      mobileNumber !== initialValues.mobileNumber ||
      email !== initialValues.email ||
      dateOfBirth !== initialValues.dateOfBirth;

    setIsButtonEnabled(hasChanges);
  }, [
    fullName,
    nationalId,
    mobileNumber,
    email,
    dateOfBirth,
    initialValues.fullName,
    initialValues.nationalId,
    initialValues.mobileNumber,
    initialValues.email,
    initialValues.dateOfBirth,
  ]);

  const saveProfile = () => {
    if (Platform.OS === 'android') {
      ToastAndroid.show('Profile has been updated!', ToastAndroid.SHORT);
    } else {
      Alert.alert('Profile has been updated!');
    }
    navigation.goBack();
  };

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        placeholderTextColor={theme.colors.darkGrayishViolet}
      />
      <TextInput
        style={styles.input}
        placeholder="National ID"
        value={nationalId}
        onChangeText={setNationalId}
        placeholderTextColor={theme.colors.darkGrayishViolet}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={mobileNumber}
        onChangeText={setMobileNumber}
        placeholderTextColor={theme.colors.darkGrayishViolet}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={theme.colors.darkGrayishViolet}
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Birth"
        value={dateOfBirth}
        onChangeText={setDateOfBirth}
        placeholderTextColor={theme.colors.darkGrayishViolet}
      />
      <TouchableOpacity
        style={[styles.saveButton, {opacity: isButtonEnabled ? 1 : 0.5}]}
        onPress={saveProfile}
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
    saveButton: {
      backgroundColor: theme.colors.primary,
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
    },
    saveButtonText: {
      color: theme.colors.text,
      fontSize: 16,
    },
  });

export default UpdateProfileScreen;
