import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Contacts from 'react-native-contacts';
import {useTheme} from '@theme/ThemeProvider';
import {maskFirstDigitsNumber} from '@utils/helpers';

const ConnectionDetailsScreen = ({route, navigation}) => {
  const {connection} = route.params;
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();
  const [nickname, setNickname] = useState(connection.nickName);
  const [newNickname, setNewNickname] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState('details');

  // Save the new nickname
  const handleSaveNickname = () => {
    if (newNickname.trim()) {
      setNickname(newNickname);
      setNewNickname('');
      setIsModalVisible(false);
      Alert.alert('Success', `Nickname changed to ${newNickname}`);
    } else {
      Alert.alert('Error', 'Please enter a valid nickname.');
    }
  };

  const handleDeleteCustomer = () => {
    Alert.alert(
      'Confirm Delete Customer',
      `Are you sure you want to delete ${connection.name} ?`,
      [
        {
          text: 'Cancel',
          onPress: () => {
            return false;
          },
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Connection deleted Successfully!');
            navigation.goBack();
          },
        },
      ],
      {cancelable: false},
    );
  };

  // Render stars for rating
  const renderStars = rate => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rate)) {
        stars.push(
          <Icon key={i} name="star" size={20} color={theme.colors.primary} />,
        );
      } else if (i === Math.ceil(rate) && rate % 1 !== 0) {
        stars.push(
          <Icon
            key={i}
            name="star-half"
            size={20}
            color={theme.colors.primary}
          />,
        );
      } else {
        stars.push(
          <Icon
            key={i}
            name="star-outline"
            size={20}
            color={theme.colors.primary}
          />,
        );
      }
    }
    return stars;
  };

  const fetchUserInformation = async userId => {
    return {
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
      email: 'johndoe@example.com',
    };
  };

  const requestContactPermission = async () => {
    if (Platform.OS === 'ios') {
      const status = await check(PERMISSIONS.IOS.CONTACTS);
      if (status === RESULTS.GRANTED) {
        return true;
      }
      const result = await request(PERMISSIONS.IOS.CONTACTS);
      return result === RESULTS.GRANTED;
    } else if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
        {
          title: 'Contacts Permission',
          message:
            'This app needs access to your contacts to add new contacts.',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return false;
  };

  const handleAddToContactList = async () => {
    try {
      const hasPermission = await requestContactPermission();
      if (!hasPermission) {
        Alert.alert('Permission to access contacts was denied');
        return;
      }

      const userInfo = await fetchUserInformation(connection.id);

      const newContact = {
        familyName: userInfo.lastName,
        givenName: userInfo.firstName,
        phoneNumbers: [
          {
            label: 'mobile',
            number: userInfo.phoneNumber,
          },
        ],
        emailAddresses: [
          {
            label: 'work',
            email: userInfo.email,
          },
        ],
      };

      Contacts.addContact(newContact, err => {
        if (err) {
          Alert.alert('Error adding contact:', err);
        } else {
          Alert.alert('Contact added Successfully!');
        }
      });
    } catch (error) {
      Alert.alert('Error adding to contact list:', error);
    }
  };

  const navigateToQRCodeScreen = () => {
    navigation.navigate('QrCode', {user: connection});
  };

  const handleSendArbon = () => {
    Alert.alert('Success', `Arbon sent to ${connection.name}`);
  };

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom}]}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image source={{uri: connection.pic}} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{connection.name}</Text>
          <Text style={styles.nickname}>Nickname: {nickname}</Text>
          {/* Rating Section */}
          <View style={styles.rateContainer}>
            <Text style={styles.rateText}>Rate: </Text>
            {renderStars(connection.rate || 4.5)}
          </View>
        </View>
      </View>

      {/* QR Code Section */}
      <TouchableOpacity
        style={styles.qrCodeSection}
        onPress={navigateToQRCodeScreen}>
        <View style={styles.qrCodeContent}>
          <Icon name="qr-code-outline" size={30} color={theme.colors.primary} />
          <Text style={styles.qrCodeText}>Account QR Code</Text>
        </View>
      </TouchableOpacity>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => setSelectedTab('details')}
          style={[styles.tab, selectedTab === 'details' && styles.selectedTab]}>
          <Text style={styles.tabText}>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab('manage')}
          style={[styles.tab, selectedTab === 'manage' && styles.selectedTab]}>
          <Text style={styles.tabText}>Manage</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      {selectedTab === 'details' ? (
        <ScrollView style={styles.details}>
          <View style={styles.detailItem}>
            <Text style={styles.detailText}>Full Name</Text>
            <Text style={styles.detailValue}>{connection.name}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailText}>National ID</Text>
            <Text style={styles.detailValue}>
              {maskFirstDigitsNumber(connection.nationalId)}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailText}>Mobile Number</Text>
            <Text style={styles.detailValue}>{connection.mobileNumber}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailText}>Email</Text>
            <Text style={styles.detailValue}>{connection.email}</Text>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.manage}>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleSendArbon}>
            <Text style={styles.settingText}>Send Arbon</Text>
            <Icon name="pricetags" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleAddToContactList}>
            <Text style={styles.settingText}>Add to Contacts</Text>
            <Icon name="person-add" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => setIsModalVisible(true)}>
            <Text style={styles.settingText}>Edit Nickname</Text>
            <Icon name="pencil" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleDeleteCustomer}>
            <Text style={styles.settingText}>Delete Connection</Text>
            <Icon name="trash" size={20} color={theme.colors.danger} />
          </TouchableOpacity>
        </View>
      )}

      {/* Edit Nickname Modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => {
          setIsModalVisible(false);
        }}
        style={styles.modal}>
        <View style={styles.ModalContent}>
          <View style={styles.TitleContainer}>
            <Text style={styles.modalTitle}>Edit Nickname</Text>
          </View>
          <Text style={styles.currentNickname}>
            Current Nickname: {nickname}
          </Text>
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter new nickname"
              value={newNickname}
              onChangeText={setNewNickname}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                disabled={newNickname === '' || newNickname === nickname}
                style={
                  newNickname !== '' && newNickname !== nickname
                    ? styles.saveButton
                    : styles.saveButtonDisabled
                }
                onPress={handleSaveNickname}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    profileHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: theme.colors.background,
      marginRight: 20,
    },
    profileInfo: {
      flex: 1,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 5,
    },
    nickname: {
      fontSize: 16,
      color: theme.colors.text,
    },
    rateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
    },
    rateText: {
      fontSize: 16,
      color: theme.colors.text,
      marginRight: 5,
    },
    tabs: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 20,
    },
    tab: {
      flex: 1,
      padding: 10,
      alignItems: 'center',
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
    },
    selectedTab: {
      borderBottomColor: theme.colors.primary,
    },
    tabText: {
      fontSize: 16,
      color: theme.colors.text,
    },
    details: {
      flex: 1,
      width: '100%',
    },
    detailItem: {
      padding: 20,
      backgroundColor: theme.colors.background,
      borderRadius: 10,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: theme.colors.border,
      justifyContent: 'center',
      height: 60,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    detailText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    detailValue: {
      fontSize: 16,
      color: theme.colors.text,
    },
    qrCodeSection: {
      padding: 10,
      backgroundColor: theme.colors.background,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginBottom: 20,
    },
    qrCodeContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    qrCodeText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.primary,
      marginLeft: 10,
    },
    manage: {
      flex: 1,
      width: '100%',
    },
    settingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      backgroundColor: theme.colors.background,
      borderRadius: 10,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: theme.colors.border,
      height: 60,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    settingText: {
      fontSize: 16,
      color: theme.colors.text,
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
    },
    TitleContainer: {alignItems: 'center'},
    modalContainer: {
      backgroundColor: theme.colors.background,
      borderRadius: 10,
      alignItems: 'center',
    },
    currentNickname: {
      fontSize: 16,
      color: theme.colors.text,
      marginBottom: 20,
    },
    input: {
      width: '100%',
      padding: 15,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 10,
      marginBottom: 15,
      color: theme.colors.text,
      backgroundColor: theme.colors.background,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    saveButton: {
      width: '100%',
      padding: 15,
      backgroundColor: theme.colors.primary,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 30,
    },
    saveButtonDisabled: {
      width: '100%',
      padding: 15,
      backgroundColor: theme.colors.darkGrayishViolet,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 30,
    },
    saveText: {
      color: theme.colors.white,
      fontSize: 16,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
      color: theme.colors.text,
    },
  });

export default ConnectionDetailsScreen;
