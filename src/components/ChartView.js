// src/components/ChartView.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '../theme/ThemeProvider';
import {SCREEN_WIDTH} from '../utils/helpers';

const ChartView = ({income, expenses}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  const total = income + expenses;
  const incomePercentage = (income / total) * 100;
  const expensesPercentage = (expenses / total) * 100;

  const greenArcRotation = (incomePercentage / 100) * 360;
  const redArcRotation = (expensesPercentage / 100) * 360;

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.textItem}>
          <Text style={styles.amountText}>{`${income} SAR`}</Text>
          <View style={styles.labelContainer}>
            <View style={[styles.circle, {backgroundColor: 'green'}]} />
            <Text style={styles.labelText}>Income</Text>
          </View>
        </View>
        <View style={styles.textItem}>
          <Text style={styles.amountText}>{`${expenses} SAR`}</Text>
          <View style={styles.labelContainer}>
            <View style={[styles.circle, {backgroundColor: 'red'}]} />
            <Text style={styles.labelText}>Expenses</Text>
          </View>
        </View>
      </View>
      <View style={styles.chartContainer}>
        <View style={styles.chart}>
          <View
            style={[
              styles.greenArc,
              {transform: [{rotate: `${greenArcRotation}deg`}]},
            ]}
          />
          <View
            style={[
              styles.redArc,
              {transform: [{rotate: `${redArcRotation}deg`}]},
            ]}
          />
          <View style={styles.percentageContainer}>
            <Text style={styles.percentageText}>
              {`${incomePercentage.toFixed(0)}%`}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      backgroundColor: theme.colors.background,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 4,
      elevation: 2,
      width: SCREEN_WIDTH - 40,
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    textItem: {
      marginBottom: 20,
    },
    amountText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    labelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
    },
    circle: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: 5,
    },
    labelText: {
      fontSize: 16,
      color: theme.colors.text,
    },
    chartContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 120,
      height: 120,
    },
    chart: {
      position: 'relative',
      width: 120,
      height: 120,
    },
    greenArc: {
      position: 'absolute',
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 12,
      borderColor: 'green',
      borderTopColor: 'transparent',
      borderRightColor: 'transparent',
    },
    redArc: {
      position: 'absolute',
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 12,
      borderColor: 'red',
      borderBottomColor: 'transparent',
      borderLeftColor: 'transparent',
    },
    percentageContainer: {
      position: 'absolute',
      top: '40%',
      left: '25%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    percentageText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'green',
    },
  });

export default ChartView;
