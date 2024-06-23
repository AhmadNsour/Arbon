// src/screens/DealsScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const DealsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => alert('Create new deal')}>
          <Icon name="add-circle-outline" size={30} color="#008467" />
          {/* Updated icon */}
        </TouchableOpacity>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Deals Overview</Text>
        {/* Replace with a real chart */}
        <View style={styles.chartPlaceholder}>
          <Text>Donut Chart Placeholder</Text>
        </View>
      </View>

      <View style={styles.dealsList}>
        <Text style={styles.sectionTitle}>Sent Deals</Text>
        {[...Array(5).keys()].map(i => (
          <View key={i} style={styles.dealItem}>
            <Text style={styles.dealText}>Deal {i + 1}</Text>
            <Text style={styles.dealAmount}>- $100.00</Text>
          </View>
        ))}
      </View>

      <View style={styles.dealsList}>
        <Text style={styles.sectionTitle}>Received Deals</Text>
        {[...Array(5).keys()].map(i => (
          <View key={i} style={styles.dealItem}>
            <Text style={styles.dealText}>Deal {i + 1}</Text>
            <Text style={styles.dealAmount}>+ $150.00</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  chartContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chartPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dealsList: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dealItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
  },
  dealText: {
    fontSize: 16,
  },
  dealAmount: {
    fontSize: 16,
    color: '#ff0000',
  },
});

export default DealsScreen;
