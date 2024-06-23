// src/components/EmptyState.js
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useTheme} from '../theme/ThemeProvider';
const {width} = Dimensions.get('window');
const EmptyState = ({title, subtitle, buttonLabel, onButtonPress}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/empty.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {buttonLabel && onButtonPress && (
        <TouchableOpacity style={styles.button} onPress={onButtonPress}>
          <Text style={styles.buttonText}>{buttonLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    image: {
      width: 150,
      height: 150,
      marginBottom: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      color: theme.colors.text,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      textAlign: 'center',
      color: theme.colors.text,
      marginBottom: 10,
    },
    button: {
      width: width - 40, // Full width minus margins
      marginHorizontal: 20, // Left and right margins
      backgroundColor: theme.colors.primary,
      paddingVertical: 15,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontSize: 16,
      color: theme.colors.white,
      textAlign: 'center',
    },
  });

export default EmptyState;
