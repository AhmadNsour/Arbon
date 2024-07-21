import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '../theme/ThemeProvider';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {FloatingAction} from 'react-native-floating-action';
import {useTranslation} from 'react-i18next';

const MoreScreen = ({navigation}) => {
  const {theme} = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme);
  const {t} = useTranslation();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleNavigation = route => {
    navigation.navigate(route);
  };

  const toggleModalVisibility = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleHelpOptionPress = option => {
    setIsModalVisible(false);
    switch (option) {
      case 'Call us':
        alert('Calling support...');
        break;
      case 'Message us':
        alert('Messaging support...');
        break;
      case 'Report an issue':
        alert('Reporting an issue...');
        break;
      default:
        break;
    }
  };

  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => handleNavigation('AboutUs')}>
          <View style={styles.itemContent}>
            <Icon
              name="information-circle-outline"
              size={24}
              color={theme.colors.primary}
              style={styles.leftIcon}
            />
            <Text style={styles.itemText}>{t('about_us')}</Text>
            <Icon
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
            <Icon
              name="call-outline"
              size={24}
              color={theme.colors.primary}
              style={styles.leftIcon}
            />
            <Text style={styles.itemText}>Contact Us</Text>
            <Icon
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
            <Icon
              name="shield-checkmark-outline"
              size={24}
              color={theme.colors.primary}
              style={styles.leftIcon}
            />
            <Text style={styles.itemText}>Privacy Policy</Text>
            <Icon
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
            <Icon
              name="document-text-outline"
              size={24}
              color={theme.colors.primary}
              style={styles.leftIcon}
            />
            <Text style={styles.itemText}>Terms and Conditions</Text>
            <Icon
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
        onPressMain={toggleModalVisibility}
        floatingIcon={
          <Icon name="headset" size={24} color={theme.colors.white} />
        }
        color={theme.colors.primary}
        showBackground={false}
      />
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModalVisibility}
        style={styles.modal}>
        <View style={styles.ModalContent}>
          <TouchableOpacity
            style={styles.modalItem}
            onPress={() => handleHelpOptionPress('Call us')}>
            <Text style={styles.modalItemText}>Call us</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalItem}
            onPress={() => handleHelpOptionPress('Message us')}>
            <Text style={styles.modalItemText}>Message us</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalItem}
            onPress={() => handleHelpOptionPress('Report an issue')}>
            <Text style={styles.modalItemText}>Report an issue</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalItem}
            onPress={toggleModalVisibility}>
            <Text style={[styles.modalItemText, {color: theme.colors.danger}]}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    scrollView: {
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
    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    ModalContent: {
      backgroundColor: theme.colors.background,
      padding: 20,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      alignItems: 'center',
    },
    modalItem: {
      padding: 15,
      width: '100%',
      alignItems: 'center',
    },
    modalItemText: {
      fontSize: 18,
      color: theme.colors.primary,
    },
  });

export default MoreScreen;
