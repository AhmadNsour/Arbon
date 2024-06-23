// src/screens/TransactionDetailsScreen.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '../theme/ThemeProvider';

const TransactionDetailsScreen = ({route}) => {
  const transaction = route?.params?.data || {};
  const {theme} = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.detailTitle}>Transaction ID</Text>
      <Text style={styles.detailText}>{transaction.id}</Text>

      <Text style={styles.detailTitle}>Amount</Text>
      <Text
        style={[
          styles.detailText,
          transaction.amount > 0
            ? styles.positiveAmount
            : styles.negativeAmount,
        ]}>
        {transaction.amount > 0
          ? `+ ${transaction.amount.toFixed(2)} JOD`
          : `- ${Math.abs(transaction.amount).toFixed(2)} JOD`}
      </Text>

      <Text style={styles.detailTitle}>Title</Text>
      <Text style={styles.detailText}>{transaction.title}</Text>

      <Text style={styles.detailTitle}>Date</Text>
      <Text style={styles.detailText}>{transaction.date}</Text>

      <Text style={styles.detailTitle}>Description</Text>
      <Text style={styles.detailText}>
        {transaction.description || 'No description available.'}
      </Text>
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
    detailTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.text,
      paddingTop: 10,
      paddingBottom: 10,
    },
    detailText: {
      fontSize: 14,
      color: theme.colors.text,
      paddingTop: 10,
      paddingBottom: 10,
    },
    positiveAmount: {
      color: theme.colors.success,
    },
    negativeAmount: {
      color: theme.colors.danger,
    },
  });

export default TransactionDetailsScreen;
