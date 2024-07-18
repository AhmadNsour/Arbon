// src/screens/HomeScreen.js
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../theme/ThemeProvider';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import EmptyState from '../components/EmptyState';
import {SCREEN_WIDTH} from '../utils/helpers';

const HomeScreen = ({navigation}) => {
  const user = useSelector(state => state.user);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();

  const [transactions] = useState([
    {id: 1, title: 'Incoming Transfer', amount: 60.0, date: 'Today, 12:49'},
    {
      id: 2,
      title: 'Outgoing Transfer',
      amount: -60.0,
      date: 'Yesterday, 10:33',
    },
    {id: 3, title: 'Incoming Transfer', amount: 14000.0, date: '13 March'},
    {id: 4, title: 'Incoming Transfer', amount: 1002.0, date: '29 July'},
    {id: 5, title: 'Incoming Transfer', amount: 901.0, date: '17 May'},
    {id: 6, title: 'Incoming Transfer', amount: 129.0, date: '13 AUGUST'},
  ]);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Icon
              name="person-outline"
              size={30}
              color={theme.colors.white}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.welcome}>
            Welcome, {user ? user.name : 'Ahmad'}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}>
            <Icon
              name="notifications-outline"
              size={30}
              color={theme.colors.white}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.balanceSection}>
          {isBalanceVisible ? (
            <Text style={styles.balanceAmount}>50,000.00</Text>
          ) : (
            <Text style={styles.balanceAmount}>******</Text>
          )}
          <Text style={styles.accountText}>Available Balance</Text>
          <View style={styles.balanceIcons}>
            {isBalanceVisible ? (
              <TouchableOpacity onPress={toggleBalanceVisibility}>
                <Icon name="eye-off" size={24} color={theme.colors.white} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={toggleBalanceVisibility}>
                <Icon name="eye-outline" size={24} color={theme.colors.white} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.actions}>
          <View style={styles.actionItem}>
            <TouchableOpacity
              style={styles.actionIconContainer}
              onPress={() => alert('Send Money')}>
              <Icon
                name="arrow-up-outline"
                size={30}
                color={theme.colors.white}
              />
              <Text style={styles.actionText}>Send Money</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.actionItem}>
            <TouchableOpacity
              style={styles.actionIconContainer}
              onPress={() => alert('Add Money')}>
              <Icon name="add-outline" size={30} color={theme.colors.white} />
              <Text style={styles.actionText}>Add Money</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.actionItem}>
            <TouchableOpacity
              style={styles.actionIconContainer}
              onPress={() => alert('More')}>
              <Icon
                name="ellipsis-horizontal-outline"
                size={30}
                color={theme.colors.white}
              />
              <Text style={styles.actionText}>More</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Bottom Section */}
      <View style={styles.lastTransactions}>
        <Text style={styles.sectionTitle}>Transactions</Text>
        {transactions.length > 4 && (
          <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
            <Text style={styles.viewAllLink}>View all</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.transactions}>
          {transactions.length > 0 ? (
            transactions.map(transaction => (
              <TouchableOpacity
                key={transaction.id}
                onPress={() => {
                  navigation.navigate('TransactionDetails', {
                    data: transaction,
                  });
                }}>
                <View key={transaction.id} style={styles.transactionItem}>
                  <Icon
                    name={
                      transaction.amount > 0
                        ? 'arrow-down-outline'
                        : 'arrow-up-outline'
                    }
                    size={24}
                    color={
                      transaction.amount > 0
                        ? theme.colors.success
                        : theme.colors.danger
                    }
                    style={styles.transactionIcon}
                  />
                  <View style={styles.transactionDetails}>
                    <Text style={styles.transactionTitle}>
                      {transaction.title}
                    </Text>
                    <Text style={styles.transactionDate}>
                      {transaction.date}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.transactionAmount,
                      transaction.amount > 0
                        ? styles.positiveAmount
                        : styles.negativeAmount,
                    ]}>
                    {transaction.amount > 0
                      ? `+ ${transaction.amount.toFixed(2)} JOD`
                      : `- ${Math.abs(transaction.amount).toFixed(2)} JOD`}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <EmptyState
              title="No Transactions Yet"
              subtitle="After your first transaction, you will be able to view it here."
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    topSection: {
      backgroundColor: theme.colors.primary,
      padding: 20,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    welcome: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.white,
    },
    balanceSection: {
      alignItems: 'center',
      marginVertical: 20,
    },
    balanceText: {
      fontSize: 16,
      color: theme.colors.white,
    },
    balanceAmount: {
      fontSize: 40,
      fontWeight: 'bold',
      color: theme.colors.white,
    },
    accountText: {
      fontSize: 16,
      color: theme.colors.white,
    },
    balanceIcons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 20,
    },
    actionItem: {
      marginTop: 10,
      alignItems: 'center',
      width: SCREEN_WIDTH / 2 - 20,
      height: SCREEN_WIDTH / 4 - 20,
      justifyContent: 'center',
    },
    actionIconContainer: {
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      borderRadius: 50,
      padding: 15,
      marginBottom: 5,
    },
    actionText: {
      color: theme.colors.white,
      fontSize: 12,
      textAlign: 'center',
      marginTop: 20,
    },
    scrollViewContent: {
      paddingTop: 10,
      paddingBottom: 20,
      paddingRight: 20,
      paddingLeft: 20,
    },
    lastTransactions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    viewAllLink: {
      fontSize: 14,
      color: theme.colors.primary,
    },
    transactions: {
      marginBottom: 20,
    },
    transactionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      backgroundColor: theme.colors.background,
      borderRadius: 10,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    transactionIcon: {
      marginRight: 15,
    },
    transactionDetails: {
      flex: 1,
    },
    transactionTitle: {
      fontSize: 16,
      color: theme.colors.text,
    },
    transactionDate: {
      fontSize: 12,
      color: theme.colors.text,
    },
    transactionAmount: {
      fontSize: 16,
    },
    positiveAmount: {
      color: theme.colors.success,
    },
    negativeAmount: {
      color: theme.colors.danger,
    },
  });

export default HomeScreen;
