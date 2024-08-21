import React, {useState} from 'react';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import {FloatingAction} from 'react-native-floating-action';
import Contacts from 'react-native-contacts';
import {useTheme} from '@theme/ThemeProvider';
import Layout from '@components/Layout';
import EmptyState from '@components/EmptyState';
import {maskFirstDigitsNumber} from '@utils/helpers';

const initialCustomers = [
  {
    id: '1',
    name: 'Ahmad Al Nsour',
    nickName: 'Al Nsour',
    NationalId: '9912392010',
    pic: 'https://via.placeholder.com/100',
    isAddedToContacts: true,
  },
  {
    id: '2',
    name: 'Jane Smith',
    nickName: 'Smith',
    NationalId: '9912392010',
    pic: 'https://via.placeholder.com/100',
    isAddedToContacts: false,
  },
  {
    id: '3',
    name: 'Sam Wilson',
    nickName: 'Wilson',
    NationalId: '9912392010',
    pic: 'https://via.placeholder.com/100',
    isAddedToContacts: false,
  },
  {
    id: '4',
    name: 'Sam Wilson',
    nickName: 'Wilson',
    NationalId: '9912392010',
    pic: 'https://via.placeholder.com/100',
    isAddedToContacts: false,
  },
];

const ConnectionsScreen = ({navigation}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [customers, setCustomers] = useState(initialCustomers);
  const [isCustomerLazyLoading, setIsCustomerLazyLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddConnection = method => {
    setIsModalVisible(false);
    if (method === 'qr_code') {
      navigation.navigate('QRCodeScannerScreen');
    } else if (method === 'manual') {
      navigation.navigate('AddConnectionScreen');
    }
  };

  const handleDeleteCustomer = () => {
    setCustomers(prev => prev.filter(c => c.id !== selectedCustomer.id));
    Alert.alert('Contact deleted successfully');
    setIsModalVisible(false);
  };

  const handleSendArbon = () => {
    console.log(
      `Customer with id ${selectedCustomer.id} will receive a request`,
    );
    setIsModalVisible(false);
  };

  const handleEditCustomer = () => {
    console.log(`Customer with id ${selectedCustomer.id} edited successfully`);
    setIsModalVisible(false);
  };

  const fetchUserInformation = async userId => {
    // Replace with your API call to fetch user information
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
    setIsModalVisible(false);
    try {
      const hasPermission = await requestContactPermission();
      if (!hasPermission) {
        Alert.alert('Permission to access contacts was denied');
        return;
      }

      const userInfo = await fetchUserInformation(selectedCustomer.id);

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
          Alert.alert('Contact added successfully');
        }
      });
    } catch (error) {
      Alert.alert('Error adding to contact list:', error);
    }
  };

  const handleItemsSelection = item => {
    setSelectedCustomer(item);
    setIsModalVisible(true);
  };

  const noConnectionAddButton = () => {
    setIsModalVisible(true);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.customerCard}
      onPress={() => handleItemsSelection(item)}>
      <Image source={{uri: item.pic}} style={styles.customerPic} />
      <View style={styles.customerInfo}>
        <Text style={styles.customerName}>{item.nickName}</Text>
        <Text style={styles.customerNationalId}>
          {maskFirstDigitsNumber(item.NationalId)}
        </Text>
      </View>
      <Icon
        name="ellipsis-vertical"
        size={24}
        color={theme.colors.primary}
        onPress={() => handleItemsSelection(item.id)}
        style={styles.leftIcon}
      />
    </TouchableOpacity>
  );

  const renderPlaceholderItem = () => (
    <View style={styles.customerCard}>
      <View style={[styles.customerPic, styles.placeholder]} />
      <View style={styles.customerInfo}>
        <View style={[styles.placeholderText, styles.placeholder]} />
        <View style={[styles.placeholderText, styles.placeholder]} />
      </View>
    </View>
  );

  const loadMoreCustomers = () => {
    if (!isCustomerLazyLoading) {
      return;
    }
    setIsCustomerLazyLoading(true);
    setTimeout(() => {
      const moreCustomers = Array.from({length: 1}, (_, index) => ({
        id: `${customers.length + index + 1}`,
        name: `New Customer ${customers.length + index + 1}`,
        nickName: `New Customer ${customers.length + index + 1}`,
        NationalId: `991239201${customers.length + index + 1}`,
        pic: 'https://via.placeholder.com/100',
      }));

      setCustomers(prevCustomers => [...prevCustomers, ...moreCustomers]);
      setIsCustomerLazyLoading(false);
    }, 1500);
  };

  const actions = [
    {
      text: 'Using QR Code',
      icon: (
        <Icon name="qr-code-outline" size={25} color={theme.colors.white} />
      ),
      name: 'qr_code',
      position: 1,
      color: theme.colors.primary,
    },
    {
      text: 'Manual',
      icon: <Icon name="create-outline" size={25} color={theme.colors.white} />,
      name: 'manual',
      position: 2,
      color: theme.colors.primary,
    },
  ];

  return (
    <Layout>
      {customers.length > 0 ? (
        <FlatList
          data={isCustomerLazyLoading ? [...customers, {}, {}] : customers}
          renderItem={({item}) =>
            item.id ? renderItem({item}) : renderPlaceholderItem()
          }
          keyExtractor={(item, index) => item.id || `placeholder-${index}`}
          contentContainerStyle={styles.listContainer}
          onEndReached={loadMoreCustomers}
          onEndReachedThreshold={0.5}
        />
      ) : (
        <EmptyState
          title="No Connections Yet"
          subtitle="After your first connection you will be able to view it here."
          buttonLabel="Connect"
          onButtonPress={() => noConnectionAddButton()}
          iconName="person-outlinee"
        />
      )}
      {customers.length > 0 && (
        <FloatingAction
          position="right"
          actions={actions}
          onPressItem={name => {
            if (name === 'qr_code') {
              handleAddConnection('qr_code');
            } else if (name === 'manual') {
              handleAddConnection('manual');
            }
          }}
          floatingIcon={
            <Icon name="add" size={24} color={theme.colors.white} />
          }
          color={theme.colors.primary}
          showBackground={false}
          actionsPaddingTopBottom={10}
        />
      )}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        style={styles.modal}>
        <View
          style={
            Platform.OS === 'ios'
              ? styles.iosModalContent
              : styles.androidModalContent
          }>
          <TouchableOpacity style={styles.modalItem} onPress={handleSendArbon}>
            <Text style={styles.modalItemText}>Send Arbon</Text>
          </TouchableOpacity>
          {selectedCustomer && !selectedCustomer.isAddedToContacts && (
            <TouchableOpacity
              style={styles.modalItem}
              onPress={handleAddToContactList}>
              <Text style={styles.modalItemText}>Add to Contact</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.modalItem}
            onPress={handleEditCustomer}>
            <Text style={styles.modalItemText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalItem}
            onPress={handleDeleteCustomer}>
            <Text style={[styles.modalItemText, {color: theme.colors.danger}]}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Layout>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 20,
    },
    listContainer: {
      paddingBottom: 20,
      paddingTop: 20,
    },
    customerCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      marginBottom: 10,
      backgroundColor: theme.colors.background,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    customerPic: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 15,
    },
    placeholder: {
      backgroundColor: '#e0e0e0',
    },
    placeholderText: {
      height: 20,
      marginBottom: 10,
      width: '80%',
      backgroundColor: '#e0e0e0',
      borderRadius: 5,
    },
    customerInfo: {
      flex: 1,
    },
    customerName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 5,
    },
    customerNationalId: {
      fontSize: 14,
      color: theme.colors.text,
    },
    leftIcon: {
      marginRight: 10,
    },
    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    iosModalContent: {
      backgroundColor: theme.colors.background,
      padding: 20,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      alignItems: 'center',
    },
    androidModalContent: {
      backgroundColor: theme.colors.background,
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      width: '80%',
      alignSelf: 'center',
    },
    modalItem: {
      padding: 20,
      backgroundColor: theme.colors.background,
      marginBottom: 15,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: theme.colors.border,
      height: 65,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      width: '100%',
      alignItems: 'center',
    },
    modalItemText: {
      fontSize: 18,
      color: theme.colors.primary,
    },
  });

export default ConnectionsScreen;
