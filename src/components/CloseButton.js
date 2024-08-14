import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@theme/ThemeProvider';

const CloseButton = ({onPress}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  return (
    <TouchableOpacity onPress={onPress} style={styles.closeButton}>
      <Icon name="close" size={24} color={theme.colors.primary} />
    </TouchableOpacity>
  );
};
const createStyles = theme =>
  StyleSheet.create({
    closeButton: {
      marginRight: 15,
    },
  });

export default CloseButton;
