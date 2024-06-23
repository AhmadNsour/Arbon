import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useTheme} from '../theme/ThemeProvider';

const TermsAndConditionsScreen = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.section}>
        By using our services, you agree to these terms and conditions.
      </Text>
      <Text style={styles.sectionTitle}>Usage of Services</Text>
      <Text style={styles.section}>
        You agree to use our services in a lawful manner and in accordance with
        these terms.
      </Text>
      <Text style={styles.sectionTitle}>Prohibited Actions</Text>
      <Text style={styles.section}>
        You may not use our services to engage in any illegal activities or
        violate any laws.
      </Text>
      <Text style={styles.sectionTitle}>Termination</Text>
      <Text style={styles.section}>
        We reserve the right to terminate your access to our services if you
        violate these terms.
      </Text>
      {/* Add more content as needed */}
    </ScrollView>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    section: {
      fontSize: 16,
      color: theme.colors.text,
      lineHeight: 24,
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: theme.colors.text,
    },
  });

export default TermsAndConditionsScreen;
