import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '../theme/ThemeProvider';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionSheet from 'react-native-actionsheet';
import {FloatingAction} from 'react-native-floating-action';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import EmptyState from '../components/EmptyState';

const initialCustomers = [
  {
    id: '1',
    name: 'Ahmad Al Nsour',
    NationalId: '9912392010',
    pic: 'https://via.placeholder.com/100',
  },
  {
    id: '2',
    name: 'Jane Smith',
    NationalId: '9912392010',
    pic: 'https://via.placeholder.com/100',
  },
  {
    id: '3',
    name: 'Sam Wilson',
    NationalId: '9912392010',
    pic: 'https://via.placeholder.com/100',
  },
  {
    id: '4',
    name: 'Sam Wilson',
    NationalId: '9912392010',
    pic: 'https://via.placeholder.com/100',
  },
];

const CustomerScreen = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const OptionActionSheet = useRef();
  const selectedCustomerId = useRef(null);
  const [customers, setCustomers] = useState(initialCustomers);
  const [isLoading, setIsLoading] = useState(false);
  const insets = useSafeAreaInsets();

  const handleAddConnection = method => {
    Alert.alert(
      'Add Connection',
      `Functionality to add a new connection using ${method}`,
    );
  };

  const handleDeleteCustomer = () => {
    Alert.alert(
      'Delete Customer',
      'Are you sure you want to delete this customer?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setCustomers(prev =>
              prev.filter(c => c.id !== selectedCustomerId.current),
            );
          },
        },
      ],
      {cancelable: true},
    );
  };

  const handleSendArbon = () => {
    console.log(
      `Customer with id ${selectedCustomerId.current} will receive a request`,
    );
  };

  const handleOptionsSelection = index => {
    if (index === 0) {
      handleSendArbon();
    } else if (index === 1) {
      handleDeleteCustomer();
    }
  };

  const handleItemsSelection = id => {
    selectedCustomerId.current = id;
    OptionActionSheet.current.show();
  };

  const noConnectionAddButton = () => {
    Alert.alert(
      'Add Connection',
      'Choose an option',
      [
        {text: 'Using QR Code', onPress: () => alert('Using QR Code...')},
        {text: 'Manual', onPress: () => alert('Manual...')},

        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: true},
    );
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.customerCard}
      onPress={() => handleItemsSelection(item.id)}>
      <Image source={{uri: item.pic}} style={styles.customerPic} />
      <View style={styles.customerInfo}>
        <Text style={styles.customerName}>{item.name}</Text>
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
    if (!isLoading) {
      return;
    }
    setIsLoading(true);

    // Simulate loading more customers with a delay
    setTimeout(() => {
      const moreCustomers = Array.from({length: 1}, (_, index) => ({
        id: `${customers.length + index + 1}`,
        name: `New Customer ${customers.length + index + 1}`,
        NationalId: `991239201${customers.length + index + 1}`,
        pic: 'https://via.placeholder.com/100',
      }));

      setCustomers(prevCustomers => [...prevCustomers, ...moreCustomers]);
      setIsLoading(false);
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
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      {customers.length > 0 ? (
        <FlatList
          data={isLoading ? [...customers, {}, {}] : customers}
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
        />
      )}
      {customers.length > 0 && (
        <FloatingAction
          position="right"
          actions={actions}
          onPressItem={name => {
            if (name === 'qr_code') {
              handleAddConnection('QR Code');
            } else if (name === 'manual') {
              handleAddConnection('Manual');
            }
          }}
          floatingIcon={
            <Icon name="add" size={30} color={theme.colors.white} />
          }
          color={theme.colors.primary}
          showBackground={false}
          actionsPaddingTopBottom={10}
        />
      )}
      <ActionSheet
        ref={OptionActionSheet}
        title="Select Option"
        options={['Send Arbon', 'Delete', 'Cancel']}
        cancelButtonIndex={2}
        destructiveButtonIndex={1}
        onPress={handleOptionsSelection}
      />
    </View>
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
  });

export default CustomerScreen;
