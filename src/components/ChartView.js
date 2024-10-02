import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import {G, Text as SvgText} from 'react-native-svg';
import {useTheme} from '@theme/ThemeProvider';
import {SCREEN_WIDTH} from '@utils/helpers';

const IncomeExpensesChart = ({income, expenses}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  const total = income + expenses;
  const data = [
    {
      key: 1,
      value: income,
      svg: {fill: theme.colors.primary},
      arc: {cornerRadius: 10},
    },
    {
      key: 2,
      value: expenses,
      svg: {fill: theme.colors.danger},
      arc: {cornerRadius: 10},
    },
  ];

  const Labels = ({slices}) => {
    return slices.map((slice, index) => {
      const {data: sliceData} = slice;
      const percentage =
        Math.round((sliceData.value / total) * 100) > 0
          ? Math.round((sliceData.value / total) * 100)
          : 0;
      if (index === 0) {
        return (
          <G key={index}>
            <SvgText
              x={0}
              y={0}
              fill={
                income > expenses ? theme.colors.primary : theme.colors.danger
              }
              textAnchor="middle"
              alignmentBaseline="middle"
              fontSize={24}
              fontWeight="bold">
              {`${percentage}%`}
            </SvgText>
          </G>
        );
      }
      return null;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.textItem}>
          <Text
            style={styles.amountText}>{`${income.toLocaleString()} JOD`}</Text>
          <View style={styles.labelContainer}>
            <View
              style={[styles.circle, {backgroundColor: theme.colors.primary}]}
            />
            <Text style={styles.labelText}>Income</Text>
          </View>
        </View>
        <View style={styles.textItem}>
          <Text
            style={
              styles.amountText
            }>{`${expenses.toLocaleString()} JOD`}</Text>
          <View style={styles.labelContainer}>
            <View
              style={[styles.circle, {backgroundColor: theme.colors.danger}]}
            />
            <Text style={styles.labelText}>Expenses</Text>
          </View>
        </View>
      </View>
      <View style={styles.chartContainer}>
        <PieChart
          style={styles.PieChartStyle}
          data={data}
          innerRadius={45}
          outerRadius={60}
          labelRadius={80}>
          <Labels />
        </PieChart>
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
    percentageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    percentageText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
    PieChartStyle: {
      height: 120,
      width: 120,
    },
  });

export default IncomeExpensesChart;
