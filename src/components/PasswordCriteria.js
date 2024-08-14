import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@theme/ThemeProvider';

const PasswordCriteria = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  const criteria = [
    'A combination of alphabets and numeric.',
    'Must be 8-16 Characters.',
    'Must have Upper & Lower case character.',
    'Cannot contain spaces or blanks.',
  ];

  return (
    <View style={styles.container}>
      {criteria.map((item, index) => (
        <View key={index} style={styles.criteriaContainer}>
          <Icon
            name={'checkmark-circle'}
            size={25}
            color={theme.colors.primary}
            style={styles.icon}
          />
          <Text style={styles.text}>{item}</Text>
        </View>
      ))}
    </View>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    container: {marginTop: 20},
    criteriaContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    icon: {
      marginRight: 10,
    },
    text: {
      fontSize: 16,
      color: theme.colors.text,
    },
  });

export default PasswordCriteria;
