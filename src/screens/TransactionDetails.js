import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useTheme} from '@theme/ThemeProvider';

const TransactionDetailsScreen = ({route}) => {
  const transaction = route?.params?.data || {};
  const {theme} = useTheme();
  const styles = createStyles(theme);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.detailTitle}>Transaction ID</Text>
        <Text style={styles.detailText}>{transaction.id}</Text>
      </View>

      <View style={styles.card}>
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
      </View>

      <View style={styles.card}>
        <Text style={styles.detailTitle}>Title</Text>
        <Text style={styles.detailText}>{transaction.title}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.detailTitle}>Date</Text>
        <Text style={styles.detailText}>{transaction.date}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.detailTitle}>Description</Text>
        <Text style={styles.detailText}>
          {transaction.description || 'No description available.'}
        </Text>
      </View>
    </ScrollView>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: theme.colors.background,
      flexGrow: 1,
    },
    card: {
      backgroundColor: theme.colors.background,
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
      borderColor: theme.colors.border,
      borderWidth: 1,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    detailTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 5,
    },
    detailText: {
      fontSize: 14,
      color: theme.colors.text,
    },
    positiveAmount: {
      color: theme.colors.success,
      fontWeight: 'bold',
    },
    negativeAmount: {
      color: theme.colors.danger,
      fontWeight: 'bold',
    },
  });

export default TransactionDetailsScreen;
