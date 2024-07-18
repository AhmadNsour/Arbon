import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../theme/ThemeProvider';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FloatingAction} from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/Ionicons';

const MoreScreen = ({navigation}) => {
  const {theme} = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme);

  const handleNavigation = route => {
    navigation.navigate(route);
  };

  const showHelpOptions = () => {
    Alert.alert(
      'Help',
      'Choose an option',
      [
        {text: 'Call us', onPress: () => alert('Calling support...')},
        {text: 'Message us', onPress: () => alert('Messaging support...')},
        {
          text: 'Report an issue',
          onPress: () => alert('Reporting an issue...'),
        },
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: true},
    );
  };

  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <ScrollView style={styles.ScrollView}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => handleNavigation('AboutUs')}>
          <View style={styles.itemContent}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color={theme.colors.primary}
              style={styles.leftIcon}
            />
            <Text style={styles.itemText}>About Us</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color={theme.colors.primary}
              style={styles.rightIcon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => handleNavigation('ContactUs')}>
          <View style={styles.itemContent}>
            <Ionicons
              name="call-outline"
              size={24}
              color={theme.colors.primary}
              style={styles.leftIcon}
            />
            <Text style={styles.itemText}>Contact Us</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color={theme.colors.primary}
              style={styles.rightIcon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => handleNavigation('PrivacyPolicy')}>
          <View style={styles.itemContent}>
            <Ionicons
              name="shield-checkmark-outline"
              size={24}
              color={theme.colors.primary}
              style={styles.leftIcon}
            />
            <Text style={styles.itemText}>Privacy Policy</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color={theme.colors.primary}
              style={styles.rightIcon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => handleNavigation('TermsAndConditions')}>
          <View style={styles.itemContent}>
            <Ionicons
              name="document-text-outline"
              size={24}
              color={theme.colors.primary}
              style={styles.leftIcon}
            />
            <Text style={styles.itemText}>Terms and Conditions</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color={theme.colors.primary}
              style={styles.rightIcon}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
      <FloatingAction
        position="right"
        onPressMain={showHelpOptions}
        floatingIcon={
          <Icon name="headset" size={24} color={theme.colors.white} />
        }
        color={theme.colors.primary}
        showBackground={false}
      />
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
    ScrollView: {
      paddingBottom: 20,
      paddingTop: 20,
    },
    item: {
      padding: 20,
      backgroundColor: theme.colors.background,
      marginBottom: 15,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: theme.colors.border,
      height: 65,
    },
    itemContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    itemText: {
      flex: 1,
      marginLeft: 10,
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: 'bold',
    },
    leftIcon: {
      marginRight: 10,
    },
    rightIcon: {
      marginLeft: 10,
    },
  });

export default MoreScreen;
