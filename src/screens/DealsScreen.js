import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {FloatingAction} from 'react-native-floating-action';
import {useTheme} from '@theme/ThemeProvider';
import EmptyState from '@components/EmptyState';
import ChartView from '@components/ChartView';
import Layout from '@components/Layout';

const DealsScreen = ({navigation}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const [selectedTab, setSelectedTab] = useState('sent');
  const [receivedDeals] = useState([]);

  const [sentDeals] = useState([
    {id: 1, title: 'Sent Deal', amount: -60.0, date: 'Today, 12:49'},
    {
      id: 2,
      title: 'Sent Deal',
      amount: -60.0,
      date: 'Yesterday, 10:33',
    },
    {id: 3, title: 'Sent Deal', amount: -14000.0, date: '13 March'},
    {id: 4, title: 'Sent Deal', amount: -1002.0, date: '29 July'},
    {id: 5, title: 'Sent Deal', amount: -901.0, date: '17 May'},
    {id: 6, title: 'Sent Deal', amount: -129.0, date: '13 AUGUST'},
  ]);

  const createNewDeal = () => {
    // Add new deal logic here
  };

  return (
    <Layout>
      <ChartView income={4500} expenses={100} />
      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => setSelectedTab('sent')}
          style={[styles.tab, selectedTab === 'sent' && styles.selectedTab]}>
          <Text style={styles.tabText}>Sent Deals</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab('received')}
          style={[
            styles.tab,
            selectedTab === 'received' && styles.selectedTab,
          ]}>
          <Text style={styles.tabText}>Received Deals</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {selectedTab === 'sent' ? (
          <View style={styles.deals}>
            {sentDeals.length > 0 ? (
              sentDeals.map(deal => (
                <TouchableOpacity
                  key={deal.id}
                  onPress={() => {
                    navigation.navigate('dealDetails', {
                      data: deal,
                    });
                  }}>
                  <View key={deal.id} style={styles.dealItem}>
                    <View style={styles.dealDetails}>
                      <Text style={styles.dealTitle}>{deal.title}</Text>
                      <Text style={styles.dealDate}>{deal.date}</Text>
                    </View>
                    <Text
                      style={[
                        styles.dealAmount,
                        deal.amount > 0
                          ? styles.positiveAmount
                          : styles.negativeAmount,
                      ]}>
                      {deal.amount > 0
                        ? `+ ${deal.amount.toFixed(2)} JOD`
                        : `- ${Math.abs(deal.amount).toFixed(2)} JOD`}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <EmptyState
                title="No Sent Deals Yet"
                subtitle="After your first deal you will be able to view it here."
                buttonLabel="New deal"
                onButtonPress={() => createNewDeal()}
                iconName="pricetags-outline"
              />
            )}
          </View>
        ) : (
          <View style={styles.deals}>
            {receivedDeals.length > 0 ? (
              receivedDeals.map(deal => (
                <TouchableOpacity
                  key={deal.id}
                  onPress={() => {
                    navigation.navigate('dealDetails', {
                      data: deal,
                    });
                  }}>
                  <View key={deal.id} style={styles.dealItem}>
                    <View style={styles.dealDetails}>
                      <Text style={styles.dealTitle}>{deal.title}</Text>
                      <Text style={styles.dealDate}>{deal.date}</Text>
                    </View>
                    <Text
                      style={[
                        styles.dealAmount,
                        deal.amount > 0
                          ? styles.positiveAmount
                          : styles.negativeAmount,
                      ]}>
                      {deal.amount > 0
                        ? `+ ${deal.amount.toFixed(2)} JOD`
                        : `- ${Math.abs(deal.amount).toFixed(2)} JOD`}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <EmptyState
                title="No Received Deals Yet"
                subtitle="After you receive your first deal you will be able to view it here."
                iconName="pricetags-outline"
              />
            )}
          </View>
        )}
      </ScrollView>
      {selectedTab === 'sent'
        ? sentDeals.length > 0 && (
            <FloatingAction
              position="right"
              onPressMain={createNewDeal}
              floatingIcon={
                <Icon name="add" size={24} color={theme.colors.white} />
              }
              color={theme.colors.primary}
              showBackground={false}
            />
          )
        : receivedDeals.length > 0 && (
            <FloatingAction
              position="right"
              onPressMain={createNewDeal}
              floatingIcon={
                <Icon name="add" size={24} color={theme.colors.white} />
              }
              color={theme.colors.primary}
              showBackground={false}
            />
          )}
    </Layout>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    chartContainer: {
      marginBottom: 20,
      padding: 20,
      backgroundColor: theme.colors.white,
      borderRadius: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 4,
      elevation: 2,
    },
    chartTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: theme.colors.text,
    },
    chartPlaceholder: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: '#ccc',
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabs: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 20,
      marginTop: 20,
    },
    tab: {
      flex: 1,
      padding: 10,
      alignItems: 'center',
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
    },
    selectedTab: {
      borderBottomColor: theme.colors.primary,
    },
    tabText: {
      fontSize: 16,
      color: theme.colors.text,
    },
    deals: {
      marginBottom: 20,
    },
    dealItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      backgroundColor: theme.colors.background,
      borderRadius: 10,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    dealIcon: {
      marginRight: 15,
    },
    dealDetails: {
      flex: 1,
    },
    dealTitle: {
      fontSize: 16,
      color: theme.colors.text,
    },
    dealDate: {
      fontSize: 12,
      color: theme.colors.text,
    },
    dealAmount: {
      fontSize: 16,
    },
    positiveAmount: {
      color: theme.colors.success,
    },
    negativeAmount: {
      color: theme.colors.danger,
    },
  });

export default DealsScreen;

// add to contacts list if needed
// partial payment for each contact
