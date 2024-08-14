import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@theme/ThemeProvider';

const BackArrow = ({onPress}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  return (
    <TouchableOpacity onPress={onPress} style={styles.BackArrow}>
      <Icon name="arrow-back" size={24} color={theme.colors.primary} />
    </TouchableOpacity>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    BackArrow: {
      marginLeft: 10,
    },
  });

export default BackArrow;
