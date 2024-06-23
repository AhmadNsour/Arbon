import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '../theme/ThemeProvider';

const AboutUsScreen = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Our app is committed to providing the best user experience. We focus on
        delivering high-quality service and continuously strive to improve our
        offerings.
      </Text>
      {/* Add more content as needed */}
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
    description: {
      fontSize: 16,
      color: theme.colors.text,
      lineHeight: 24,
    },
  });

export default AboutUsScreen;
