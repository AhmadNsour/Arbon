import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useTheme} from '../theme/ThemeProvider';

const PrivacyPolicyScreen = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.section}>
        We are committed to protecting your privacy. This privacy policy
        explains how we collect, use, and disclose personal information.
      </Text>
      <Text style={styles.sectionTitle}>Information Collection</Text>
      <Text style={styles.section}>
        We collect information to provide better services to our users.
      </Text>
      <Text style={styles.sectionTitle}>Information Use</Text>
      <Text style={styles.section}>
        We use the information we collect to improve our services and provide
        you with a personalized experience.
      </Text>
      <Text style={styles.sectionTitle}>Information Disclosure</Text>
      <Text style={styles.section}>
        We do not share personal information with companies, organizations, or
        individuals outside of our company unless required by law.
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

export default PrivacyPolicyScreen;
