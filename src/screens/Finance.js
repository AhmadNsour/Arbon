import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@theme/ThemeProvider';
import Layout from '@components/Layout';
import InfoCard from '@components/InfoCard';
import {SCREEN_WIDTH} from '@utils/helpers';

const FinanceScreen = ({navigation}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  const [accounts, setAccounts] = useState([
    {id: '1', bankName: 'Bank A', accountNumber: '4363910293745832'},
    {id: '2', bankName: 'Bank A', accountNumber: '4363910293745832'},
  ]);
  const [cards, setCards] = useState([
    {
      id: '1',
      cardNumber: '4363910293745832',
      cardType: 'VISA',
      bankName: 'Bank A',
    },
    {
      id: '2',
      cardNumber: '1234567890123456',
      cardType: 'MASTER',
      bankName: 'Bank A',
    },
  ]);

  const handleDeleteAccount = id => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete this account?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          onPress: () =>
            setAccounts(accounts.filter(account => account.id !== id)),
        },
      ],
    );
  };

  const handleDeleteCard = id => {
    Alert.alert('Delete Card', 'Are you sure you want to delete this card?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        onPress: () => setCards(cards.filter(card => card.id !== id)),
      },
    ]);
  };

  const addNewCard = () => {
    alert('Add new card');
  };

  const addNewAccount = () => {
    alert('Add new account');
  };

  const renderCard = item => (
    <View key={item.id} style={styles.cardContainer}>
      <View style={styles.cardTopSection}>
        <View>
          <Text style={styles.title}>{item.bankName}</Text>
        </View>
        <View>
          <Image
            source={
              item.cardType === 'VISA'
                ? require('@assets/images/visa.png')
                : require('@assets/images/mastercard.png')
            }
            style={styles.cardIcon}
          />
        </View>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.number}>
          {item.cardNumber.slice(0, 4) +
            ' XXXX XXXX ' +
            item.cardNumber.slice(-4)}
        </Text>
        <TouchableOpacity onPress={() => handleDeleteAccount(item.id)}>
          <Icon name="trash-outline" size={24} color={theme.colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderAccount = item => (
    <View key={item.id} style={styles.cardContainer}>
      <View>
        <Text style={styles.title}>{item.bankName}</Text>
      </View>
      <View style={styles.cardTopSection}>
        <Text style={styles.number}>
          {item.accountNumber.slice(0, 4) +
            ' XXXX XXXX ' +
            item.accountNumber.slice(-4)}
        </Text>
        <TouchableOpacity onPress={() => handleDeleteAccount(item.id)}>
          <Icon name="trash-outline" size={24} color={theme.colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderAddMore = (title, action) => (
    <TouchableOpacity
      style={styles.lastItemContainerAddition}
      onPress={() => action()}>
      <Text style={styles.addAccountText}>{title}</Text>
      <Icon name="add-outline" size={30} color={theme.colors.white} />
    </TouchableOpacity>
  );

  const renderEmpty = (title, action) => (
    <TouchableOpacity
      style={styles.lastItemContainerEmpty}
      onPress={() => action()}>
      <Text style={styles.addAccountText}>{title}</Text>
      <Icon name="add-outline" size={30} color={theme.colors.white} />
    </TouchableOpacity>
  );

  return (
    <Layout>
      <ScrollView style={styles.container}>
        <InfoCard
          iconName="card-outline"
          title="Finance"
          description="Manage your linked bank accounts and cards for seamless transactions. Add new accounts or cards, view details, and remove old payment methods."
          collapsedText="Finance Overview"
        />
        <Text style={styles.header}>Linked Accounts</Text>
        {accounts.length === 0 ? (
          renderEmpty('Add New Account', addNewAccount)
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.carouselContainer}>
            {accounts.map(renderAccount)}
            {renderAddMore('Add New Account', addNewAccount)}
          </ScrollView>
        )}
        <Text style={styles.header}>Linked Cards</Text>
        {cards.length === 0 ? (
          renderEmpty('Add New Card', addNewCard)
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.carouselContainer}>
            {cards.map(renderCard)}
            {renderAddMore('Add New Card', addNewCard)}
          </ScrollView>
        )}
      </ScrollView>
    </Layout>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 0,
      backgroundColor: theme.colors.background,
    },
    header: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
      color: theme.colors.text,
    },
    carouselContainer: {
      marginBottom: 30,
    },
    cardContainer: {
      borderRadius: 15,
      padding: 20,
      marginRight: 15,
      width: SCREEN_WIDTH * 0.8,
      justifyContent: 'space-between',
      height: 180,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: {width: 0, height: 5},
      shadowRadius: 4,
      elevation: 3,
      backgroundColor: theme.colors.primary,
    },
    cardTopSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 22,
      color: theme.colors.white,
      fontWeight: 'bold',
    },
    emptyTitle: {
      fontSize: 18,
      color: theme.colors.white,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    number: {
      fontSize: 18,
      color: theme.colors.white,
      letterSpacing: 2,
    },
    cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cardIcon: {
      width: 40,
      height: 30,
      resizeMode: 'contain',
    },
    lastItemContainerAddition: {
      borderRadius: 15,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      marginRight: 15,
      width: SCREEN_WIDTH * 0.4,
      height: 180,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: {width: 0, height: 5},
      shadowRadius: 4,
      elevation: 3,
    },
    lastItemContainerEmpty: {
      borderRadius: 15,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      marginRight: 15,
      width: SCREEN_WIDTH * 0.9,
      height: 180,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: {width: 0, height: 5},
      shadowRadius: 4,
      elevation: 3,
      marginBottom: 30,
    },
    addAccountText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.white,
      marginBottom: 10,
      textAlign: 'center',
    },
    addButton: {
      backgroundColor: theme.colors.primary,
      padding: 10,
      borderRadius: 50,
    },
  });

export default FinanceScreen;
