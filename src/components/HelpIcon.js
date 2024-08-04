import React from 'react';
import {TouchableOpacity, Alert, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HelpIcon = () => {
  const showHelpOptions = () => {
    Alert.alert(
      'Help',
      'Choose an option',
      [
        {text: 'Call us', onPress: () => alert('Calling support...')},
        {text: 'Message us', onPress: () => alert('Messaging support...')},
        {
          text: 'Report an issue',
          onPress: () => alert('Reporting an issue...'),
        },
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: true},
    );
  };

  return (
    <TouchableOpacity onPress={showHelpOptions} style={styles.iconContainer}>
      <Icon name="help-circle-outline" size={30} color="#008467" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    marginLeft: 15,
    marginRight: 15,
  },
});

export default HelpIcon;
