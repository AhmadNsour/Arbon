import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@theme/ThemeProvider';

const ContactUsScreen = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  const socialMediaColors = {
    facebook: '#1877F2',
    instagram: '#C13584',
    linkedin: '#0077B5',
    youtube: '#FF0000',
    xing: '#006056',
    website: '#008467',
  };

  const contactOptions = [
    {
      icon: 'mail-open-outline',
      label: 'Email',
      value: 'info@arbon.com',
      action: () => Linking.openURL('mailto:support@arbon.com'),
    },
    {
      icon: 'call-outline',
      label: 'Phone Banking',
      value: '+1234567890',
      action: () => Linking.openURL('tel:+1234567890'),
    },
  ];

  const socialMediaOptions = [
    {
      icon: 'logo-facebook',
      name: 'Facebook',
      color: socialMediaColors.facebook,
      action: () => Linking.openURL('https://www.facebook.com/arbon'),
    },
    {
      icon: 'logo-instagram',
      name: 'Instagram',
      color: socialMediaColors.instagram,
      action: () => Linking.openURL('https://www.instagram.com/arbon'),
    },
    {
      icon: 'logo-youtube',
      name: 'YouTube',
      color: socialMediaColors.youtube,
      action: () => Linking.openURL('https://www.youtube.com/arbon'),
    },
    {
      icon: 'logo-linkedin',
      name: 'LinkedIn',
      color: socialMediaColors.linkedin,
      action: () => Linking.openURL('https://www.linkedin.com/company/arbon'),
    },
    {
      icon: 'logo-xing',
      name: 'X',
      color: socialMediaColors.xing,
      action: () => Linking.openURL('https://www.xing.com/arbon'),
    },
    {
      icon: 'globe-outline',
      name: 'Website',
      color: socialMediaColors.website,
      action: () => Linking.openURL('https://www.arbon.com'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.faqContainer}
        onPress={() => Linking.openURL('https://www.arbon.com/faq')}>
        <View style={styles.faqContent}>
          <Icon name="information-circle" size={24} color="#008467" />
          <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
        </View>
        <Icon name="chevron-forward" size={24} color={theme.colors.primary} />
      </TouchableOpacity>

      <View style={styles.contactContainer}>
        {contactOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.contactItem}
            onPress={option.action}>
            <Icon
              name={option.icon}
              size={24}
              color={theme.colors.primary}
              style={styles.icon}
            />
            <Text style={styles.contactLabel}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.socialMediaContainer}>
        <Text style={styles.socialMediaTitle}>Social Media Account</Text>
        <View style={styles.socialMediaRow}>
          {socialMediaOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.socialMediaItem}
              onPress={option.action}>
              <Icon name={option.icon} size={32} color={option.color} />
              <Text style={styles.socialMediaName}>{option.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
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
    faqContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      backgroundColor: theme.colors.background,
      borderRadius: 10,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    faqContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    faqIcon: {
      marginRight: 10,
    },
    faqTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginLeft: 10,
    },
    contactContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    contactItem: {
      width: '48%',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      backgroundColor: theme.colors.background,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    icon: {
      marginRight: 10,
    },
    contactLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.text,
      paddingRight: 30,
    },
    socialMediaContainer: {
      padding: 20,
      backgroundColor: theme.colors.background,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    socialMediaTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 15,
      color: theme.colors.primary,
    },
    socialMediaRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    socialMediaItem: {
      width: '30%',
      alignItems: 'center',
      padding: 10,
      marginBottom: 15,
    },
    socialMediaName: {
      fontSize: 16,
      marginTop: 5,
      color: theme.colors.text,
      textAlign: 'center',
    },
  });

export default ContactUsScreen;
