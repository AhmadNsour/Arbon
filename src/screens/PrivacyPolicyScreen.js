import React from 'react';
import {View, Text, StyleSheet, ScrollView, Linking} from 'react-native';
import {useTheme} from '../theme/ThemeProvider';

const PrivacyPolicyScreen = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  const handleEmailPress = () => {
    Linking.openURL('mailto:support@arbon.com');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.paragraph}>
          We value your privacy and are committed to protecting your personal
          data. This privacy policy will inform you how we handle your personal
          data, your privacy rights, and how the law protects you.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Information We Collect</Text>
        <View style={styles.bulletContainer}>
          <View style={styles.bulletPoint} />
          <Text style={styles.bulletText}>
            Personal Identification Information (Name, Email Address, Phone
            Number, etc.)
          </Text>
        </View>
        <View style={styles.bulletContainer}>
          <View style={styles.bulletPoint} />
          <Text style={styles.bulletText}>
            Usage Data (how you use our app, services you access, etc.)
          </Text>
        </View>
        <View style={styles.bulletContainer}>
          <View style={styles.bulletPoint} />
          <Text style={styles.bulletText}>
            Device Information (IP address, browser type, device type, etc.)
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>How We Use Information</Text>
        <View style={styles.bulletContainer}>
          <View style={styles.bulletPoint} />
          <Text style={styles.bulletText}>
            Provide, operate, and maintain our services
          </Text>
        </View>
        <View style={styles.bulletContainer}>
          <View style={styles.bulletPoint} />
          <Text style={styles.bulletText}>
            Improve, personalize, and expand our services
          </Text>
        </View>
        <View style={styles.bulletContainer}>
          <View style={styles.bulletPoint} />
          <Text style={styles.bulletText}>
            Understand and analyze how you use our services
          </Text>
        </View>
        <View style={styles.bulletContainer}>
          <View style={styles.bulletPoint} />
          <Text style={styles.bulletText}>
            Develop new products, services, features, and functionality
          </Text>
        </View>
        <View style={styles.bulletContainer}>
          <View style={styles.bulletPoint} />
          <Text style={styles.bulletText}>
            Communicate with you, either directly or through one of our partners
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Third-Party Sharing</Text>
        <Text style={styles.paragraph}>
          We do not share your personal data with third parties except as
          described in this privacy policy. We may share information with:
        </Text>
        <View style={styles.bulletContainer}>
          <View style={styles.bulletPoint} />
          <Text style={styles.bulletText}>
            Service Providers: We employ third-party companies and individuals
            to facilitate our service
          </Text>
        </View>
        <View style={styles.bulletContainer}>
          <View style={styles.bulletPoint} />
          <Text style={styles.bulletText}>
            Business Transfers: If we are involved in a merger, acquisition, or
            asset sale, your personal data may be transferred
          </Text>
        </View>
        <View style={styles.bulletContainer}>
          <View style={styles.bulletPoint} />
          <Text style={styles.bulletText}>
            Law Enforcement: Under certain circumstances, we may be required to
            disclose your personal data if required to do so by law or in
            response to valid requests by public authorities
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Your Rights</Text>
        <View style={styles.bulletContainer}>
          <View style={styles.bulletPoint} />
          <Text style={styles.bulletText}>
            Access, update or delete the information we have on you
          </Text>
        </View>
        <View style={styles.bulletContainer}>
          <View style={styles.bulletPoint} />
          <Text style={styles.bulletText}>
            Rectify any information you believe is inaccurate
          </Text>
        </View>
        <View style={styles.bulletContainer}>
          <View style={styles.bulletPoint} />
          <Text style={styles.bulletText}>
            Object to our processing of your personal data
          </Text>
        </View>
        <View style={styles.bulletContainer}>
          <View style={styles.bulletPoint} />
          <Text style={styles.bulletText}>
            Request that we restrict the processing of your personal data
          </Text>
        </View>
      </View>

      <View style={[styles.section, styles.lastSection]}>
        <Text style={styles.heading}>Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have any questions or suggestions about our Privacy Policy, do
          not hesitate to contact us at:{' '}
          <Text style={styles.link} onPress={handleEmailPress}>
            support@arbon.com
          </Text>
        </Text>
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
