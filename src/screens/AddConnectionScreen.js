import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useTheme} from '../theme/ThemeProvider';

const AddConnectionScreen = ({navigation}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const [nationalId, setNationalId] = useState('');
  const [nickname, setNickname] = useState('');
  const [nationalIdErrorMessage, setNationalIdErrorMessage] = useState('');
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState('');
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current) {
      inputRefs.current.focus();
    }
  }, []);

  const handleAddConnection = () => {
    //call api
    navigation.navigate('AddConnectionConfirmScreen', {
      firstName: 'John',
      lastName: 'Doe',
      mobileNumber: '1234567890',
      gender: 'Male',
      email: 'john.doe@example.com',
      dateOfBirth: '01/01/1990',
    });
  };

  const handleNationalIdOnChange = value => {
    if (/^\d*$/.test(value) || value === '') {
      setNationalId(value);
      setNationalIdErrorMessage('');
    } else {
      setNationalIdErrorMessage('National ID can only contain digits.');
    }
  };

  const handleNicknameOnChange = value => {
    if (/^[a-zA-Z0-9\u0600-\u06FF]*$/.test(value) || value === '') {
      setNickname(value);
      setNicknameErrorMessage('');
    } else {
      setNicknameErrorMessage(
        'Nickname can only contain Arabic or English characters and digits.',
      );
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

  const handleNicknameBlur = () => {
    if (nickname.length === 0) {
      return;
    }
    if (nickname.length < 4) {
      setNicknameErrorMessage('Nickname must be at least 5 digits long.');
    } else {
      setNicknameErrorMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>National Id</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the national Identity"
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
          <Text style={styles.inputLabel}>Nickname</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter a nickname"
            value={nickname}
            maxLength={15}
            onChangeText={handleNicknameOnChange}
            onBlur={handleNicknameBlur}
          />
          {nicknameErrorMessage && (
            <Text style={styles.errorText}>{nicknameErrorMessage}</Text>
          )}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={
            nationalId === '' ||
            nationalId.length < 10 ||
            nickname === '' ||
            nickname.length < 4
              ? styles.addButtonDisabled
              : styles.addButton
          }
          disabled={
            nationalId === '' ||
            nationalId.length < 10 ||
            nickname === '' ||
            nickname.length < 4
          }
          onPress={handleAddConnection}>
          <Text style={styles.addButtonText}>Add</Text>
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
    content: {
      flexGrow: 1,
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
    errorText: {
      color: theme.colors.danger,
      marginTop: 5,
      fontSize: 12,
    },
    buttonContainer: {
      justifyContent: 'flex-end',
    },
    addButton: {
      width: '100%',
      padding: 15,
      backgroundColor: theme.colors.primary,
      borderRadius: 10,
      alignItems: 'center',
      marginVertical: 20,
    },
    addButtonDisabled: {
      width: '100%',
      padding: 15,
      backgroundColor: theme.colors.darkGrayishViolet,
      borderRadius: 10,
      alignItems: 'center',
      marginVertical: 20,
    },
    addButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });

export default AddConnectionScreen;
