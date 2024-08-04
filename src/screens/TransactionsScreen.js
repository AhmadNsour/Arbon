import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '../theme/ThemeProvider';
import EmptyState from '../components/EmptyState';
import Icon from 'react-native-vector-icons/Ionicons';

const TransactionsScreen = ({navigation}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  const [transactions] = useState([
    {id: 1, title: 'Sadad Payments', amount: 60.0, date: 'Today, 12:49'},
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

  return (
    <View style={styles.container}>
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
                <View style={styles.transactionItem}>
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
              iconName="folder-open"
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
      padding: 10,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text,
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

export default TransactionsScreen;
