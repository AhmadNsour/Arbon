import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {useTheme} from '../theme/ThemeProvider';
import Icon from 'react-native-vector-icons/Ionicons';
import {FloatingAction} from 'react-native-floating-action';
import Layout from '../components/Layout';
import EmptyState from '../components/EmptyState';
import Modal from 'react-native-modal';

const initialCustomers = [
  {
    id: '1',
    name: 'Ahmad Al Nsour',
    nickName: 'Al Nsour',
    NationalId: '9912392010',
    pic: 'https://via.placeholder.com/100',
  },
  {
    id: '2',
    name: 'Jane Smith',
    nickName: 'Smith',
    NationalId: '9912392010',
    pic: 'https://via.placeholder.com/100',
  },
  {
    id: '3',
    name: 'Sam Wilson',
    nickName: 'Wilson',
    NationalId: '9912392010',
    pic: 'https://via.placeholder.com/100',
  },
  {
    id: '4',
    name: 'Sam Wilson',
    nickName: 'Wilson',
    NationalId: '9912392010',
    pic: 'https://via.placeholder.com/100',
  },
];

const CustomerScreen = ({navigation}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const selectedCustomerId = useRef(null);
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
    setCustomers(prev => prev.filter(c => c.id !== selectedCustomerId.current));
    setIsModalVisible(false);
  };

  const handleSendArbon = () => {
    console.log(
      `Customer with id ${selectedCustomerId.current} will receive a request`,
    );
    setIsModalVisible(false);
  };

  const handleEditCustomer = () => {
    console.log(
      `Customer with id ${selectedCustomerId.current} edited successfully`,
    );
    setIsModalVisible(false);
  };

  const handleItemsSelection = id => {
    selectedCustomerId.current = id;
    setIsModalVisible(true);
  };

  const noConnectionAddButton = () => {
    setIsModalVisible(true);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.customerCard}
      onPress={() => handleItemsSelection(item.id)}>
      <Image source={{uri: item.pic}} style={styles.customerPic} />
      <View style={styles.customerInfo}>
        <Text style={styles.customerName}>{item.nickName}</Text>
        <Text style={styles.customerNationalId}>{item.NationalId}</Text>
      </View>
      <Icon
        name="ellipsis-vertical"
        size={24}
        color={theme.colors.primary}
        onPress={() => handleItemsSelection(item.id)}
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

    // Simulate loading more customers with a delay
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
    },
    customerNationalId: {
      fontSize: 14,
      color: theme.colors.text,
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
      padding: 15,
      width: '100%',
      alignItems: 'center',
    },
    modalItemText: {
      fontSize: 18,
      color: theme.colors.primary,
    },
  });

export default CustomerScreen;
