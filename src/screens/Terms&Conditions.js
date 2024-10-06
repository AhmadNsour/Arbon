import React from 'react';
import {View, Text, StyleSheet, ScrollView, Linking} from 'react-native';
import {useTheme} from '@theme/ThemeProvider';

const TermsAndConditionsScreen = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  const handleEmailPress = () => {
    Linking.openURL('mailto:support@arbon.com');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.paragraph}>
          By using our services, you agree to the following terms and
          conditions.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Introduction</Text>
        <Text style={styles.paragraph}>
          Welcome to Arbon. These terms and conditions outline the rules and
          regulations for the use of our services.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Intellectual Property Rights</Text>
        <Text style={styles.paragraph}>
          Other than the content you own, under these Terms, Arbon and/or its
          licensors own all the intellectual property rights and materials
          contained in this service.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Restrictions</Text>
        <View style={styles.bulletContainer}>
          <View style={styles.bulletPoint} />
          <Text style={styles.bulletText}>
            You are specifically restricted from publishing any material from
            our services in any other media.
          </Text>
        </View>
        <View style={styles.bulletContainer}>
          <View style={styles.bulletPoint} />
          <Text style={styles.bulletText}>
            Selling, sublicensing, and/or otherwise commercializing any material
            from our services.
          </Text>
        </View>
        <View style={styles.bulletContainer}>
          <View style={styles.bulletPoint} />
          <Text style={styles.bulletText}>
            Using this service in any way that is or may be damaging to this
            service.
          </Text>
        </View>
        <View style={styles.bulletContainer}>
          <View style={styles.bulletPoint} />
          <Text style={styles.bulletText}>
            Using this service in any way that impacts user access to this
            service.
          </Text>
        </View>
        <View style={styles.bulletContainer}>
          <View style={styles.bulletPoint} />
          <Text style={styles.bulletText}>
            Engaging in any data mining, data harvesting, data extracting, or
            any other similar activity.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Your Content</Text>
        <Text style={styles.paragraph}>
          In these Terms and Conditions, "Your Content" shall mean any audio,
          video, text, images, or other material you choose to display on this
          service. By displaying Your Content, you grant Arbon a non-exclusive,
          worldwide, irrevocable, sub-licensable license to use, reproduce,
          adapt, publish, translate, and distribute it in any media.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>No Warranties</Text>
        <Text style={styles.paragraph}>
          This service is provided "as is," with all faults, and Arbon expresses
          no representations or warranties of any kind related to this service
          or the materials contained on this service.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Limitation of Liability</Text>
        <Text style={styles.paragraph}>
          In no event shall Arbon, nor any of its officers, directors, and
          employees, be held liable for anything arising out of or in any way
          connected with your use of this service, whether such liability is
          under contract. Arbon, including its officers, directors, and
          employees, shall not be held liable for any indirect, consequential,
          or special liability arising out of or in any way related to your use
          of this service.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Indemnification</Text>
        <Text style={styles.paragraph}>
          You hereby indemnify to the fullest extent Arbon from and against any
          and all liabilities, costs, demands, causes of action, damages, and
          expenses arising in any way related to your breach of any of the
          provisions of these Terms.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Severability</Text>
        <Text style={styles.paragraph}>
          If any provision of these Terms is found to be invalid under any
          applicable law, such provisions shall be deleted without affecting the
          remaining provisions herein.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Variation of Terms</Text>
        <Text style={styles.paragraph}>
          Arbon is permitted to revise these Terms at any time as it sees fit,
          and by using this service, you are expected to review these Terms on a
          regular basis.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Assignment</Text>
        <Text style={styles.paragraph}>
          Arbon is allowed to assign, transfer, and subcontract its rights
          and/or obligations under these Terms without any notification.
          However, you are not allowed to assign, transfer, or subcontract any
          of your rights and/or obligations under these Terms.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Entire Agreement</Text>
        <Text style={styles.paragraph}>
          These Terms constitute the entire agreement between Arbon and you in
          relation to your use of this service and supersede all prior
          agreements and understandings.
        </Text>
      </View>

      <View style={[styles.section, styles.lastSection]}>
        <Text style={styles.heading}>Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have any questions about these Terms, please contact us at:{' '}
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
      color: theme.colors.primary,
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
      marginBottom: 50,
    },
    link: {
      color: theme.colors.primary,
      textDecorationLine: 'underline',
    },
  });

export default TermsAndConditionsScreen;
