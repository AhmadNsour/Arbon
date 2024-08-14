import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useTheme} from '@theme/ThemeProvider';

const PrivacyPolicyScreen = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.paragraph}>
          We Provide a secure digital solution that facilitates financial
          transactions, ensuring the rights of both buyers and sellers.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Features</Text>
        <View style={styles.bulletContainer}>
          <View style={styles.bulletPoint} />
          <Text style={styles.bulletText}>
            Guarantee System: Payment is held in escrow until the service or
            product is received.
          </Text>
        </View>
        <View style={styles.bulletContainer}>
          <View style={styles.bulletPoint} />
          <Text style={styles.bulletText}>
            Rating System: Both buyer and seller rate each other
            post-transaction.
          </Text>
        </View>
        <View style={styles.bulletContainer}>
          <View style={styles.bulletPoint} />
          <Text style={styles.bulletText}>
            Identity Verification: Ensures participants use verified identities.
          </Text>
        </View>
        <View style={styles.bulletContainer}>
          <View style={styles.bulletPoint} />
          <Text style={styles.bulletText}>
            Clear Policies: Protects the rights of all parties involved.
          </Text>
        </View>
        <View style={styles.bulletContainer}>
          <View style={styles.bulletPoint} />
          <Text style={styles.bulletText}>
            Technical Support: Provides support for dispute resolution.
          </Text>
        </View>
      </View>

      <View style={[styles.section, styles.lastSection]}>
        <Text style={styles.heading}>Expected Benefits</Text>
        <View style={styles.bulletContainer}>
          <View style={styles.bulletPoint} />
          <Text style={styles.bulletText}>
            Reduce fraud in small transactions.
          </Text>
        </View>
        <View style={styles.bulletContainer}>
          <View style={styles.bulletPoint} />
          <Text style={styles.bulletText}>
            Enhance trust between buyers and sellers.
          </Text>
        </View>
        <View style={styles.bulletContainer}>
          <View style={styles.bulletPoint} />
          <Text style={styles.bulletText}>
            Provide a secure and reliable digital solution.
          </Text>
        </View>
        <View style={styles.bulletContainer}>
          <View style={styles.bulletPoint} />
          <Text style={styles.bulletText}>
            Support the growth of safe and efficient daily e-commerce.
          </Text>
        </View>
        <View style={styles.bulletContainer}>
          <View style={styles.bulletPoint} />
          <Text style={styles.bulletText}>
            Communicate with you, either directly or through one of our partners
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    section: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 10,
    },
    paragraph: {
      fontSize: 16,
      color: theme.colors.text,
      lineHeight: 24,
    },
    bulletContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 10,
    },
    bulletPoint: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.primary,
      marginTop: 6,
      marginRight: 10,
    },
    bulletText: {
      fontSize: 16,
      color: theme.colors.text,
      flex: 1,
      lineHeight: 24,
    },
    lastSection: {
      borderBottomWidth: 0,
    },
    link: {
      color: theme.colors.primary,
      textDecorationLine: 'underline',
    },
  });

export default PrivacyPolicyScreen;
