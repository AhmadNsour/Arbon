import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {resetSettings} from '@store/actions/settingsActions';
import {useTheme} from '@theme/ThemeProvider';
import {CommonActions} from '@react-navigation/native';

const ResetSettingsScreen = ({navigation}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const dispatch = useDispatch();

  const handleReset = () => {
    Alert.alert(
      'Reset Settings',
      'Are you sure you want to reset all settings to their default values?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          onPress: () => {
            dispatch(resetSettings());
            navigation.navigate('login');
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'login'}],
              }),
            );
          },
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reset All Settings</Text>
      <Text style={styles.description}>
        This will reset all settings to their default values.
      </Text>
      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetButtonText}>Reset Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.primary,
      marginBottom: 20,
      textAlign: 'center',
    },
    description: {
      fontSize: 16,
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: 20,
    },
    resetButton: {
      backgroundColor: theme.colors.danger,
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 10,
      alignItems: 'center',
    },
    resetButtonText: {
      color: theme.colors.white,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default ResetSettingsScreen;
