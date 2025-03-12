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
import WhatsNew from '@components/WhatsNew';
import {SCREEN_WIDTH} from '@utils/helpers';
import EmptyState from '@components/EmptyState';
import HeaderSection from '@components/HeaderSection';

const WalletScreen = ({navigation}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  const [paymentMethods, setPaymentMethods] = useState([
    {id: '1', name: 'Bank A', number: '4363910293745832'},
    {id: '4', name: 'Bank A', number: '4363910293745832'},
    {
      id: '2',
      number: '4363910293745832',
      cardType: 'VISA',
      name: 'Credit Card A',
    },
    {
      id: '3',
      number: '1234567890123456',
      cardType: 'MASTER',
      name: 'Master Card B',
    },
  ]);

  const handleDelete = item => {
    Alert.alert(`Delete ${item.name}`, 'Are you sure you want to delete ?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        onPress: () =>
          setPaymentMethods(
            paymentMethods.filter(account => account.id !== item.id),
          ),
        style: 'destructive',
      },
    ]);
  };

  const addNewPaymentMethod = () => {
    alert('add New Payment Method');
  };

  const renderPaymentMethod = item => (
    <View key={item.id} style={styles.cardContainer}>
      <View style={styles.cardTopSection}>
        <View>
          <Text style={styles.title}>{item.name}</Text>
        </View>
        {item.cardType && (
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
        )}
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.number}>
          {item.number.slice(0, 4) + ' XXXX XXXX ' + item.number.slice(-4)}
        </Text>
        <TouchableOpacity onPress={() => handleDelete(item)}>
          <Icon name="trash-outline" size={24} color={theme.colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Layout>
      <HeaderSection
        navigation={navigation}
        action={addNewPaymentMethod}
        showSection={paymentMethods.length !== 0}
      />
      <WhatsNew screenName="wallet" />
      {paymentMethods.length === 0 ? (
        <EmptyState
          title="No Payment Method Yet"
          subtitle="After you add your first payment method you will be able to view it here."
          buttonLabel="Add Payment Method"
          onButtonPress={() => addNewPaymentMethod()}
          iconName="wallet-outline"
        />
      ) : (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          {paymentMethods.map(renderPaymentMethod)}
        </ScrollView>
      )}
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
    cardContainer: {
      borderRadius: 15,
      padding: 20,
      width: SCREEN_WIDTH * 0.9,
      justifyContent: 'space-between',
      height: 120,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: {width: 0, height: 5},
      shadowRadius: 4,
      elevation: 3,
      backgroundColor: theme.colors.primary,
      marginBottom: 20,
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
      width: SCREEN_WIDTH * 0.9,
      height: 120,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: {width: 0, height: 5},
      shadowRadius: 4,
      elevation: 3,
    },
    addAccountText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.white,
      marginBottom: 10,
      textAlign: 'center',
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
      height: 60,
    },
    iconHolder: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default WalletScreen;
