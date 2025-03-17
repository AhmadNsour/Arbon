import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import {useTheme} from '@theme/ThemeProvider';

const NotificationScreen = ({navigation}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  const [selectedCategory, setSelectedCategory] = useState('1');

  const notificationCategory = [
    {id: '1', name: 'General'},
    {id: '2', name: 'Transactions'},
    {id: '3', name: 'Offers'},
  ];

  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'New Update Available',
      description: 'Version 1.1.0 is now available for download.',
      category: '1',
      type: 'link',
      url: 'https://example.com/update',
      read: false,
      date: new Date('2024-07-19T10:00:00Z'),
    },
    {
      id: '2',
      title: 'Welcome to our App',
      description: 'Thank you for joining us!',
      category: '1',
      type: 'none',
      read: true,
      date: new Date('2024-07-10T21:00:00Z'),
    },
    {
      id: '3',
      title: 'Transaction Successful',
      description: 'Your recent transaction of $1000 was successful.',
      category: '2',
      type: 'page',
      page: 'Transactions',
      read: false,
      date: new Date('2024-07-16T14:00:00Z'),
    },
    {
      id: '4',
      title: 'Transaction Failed',
      description: 'The transaction of $659 failed',
      category: '2',
      type: 'pageWithData',
      page: 'TransactionDetails',
      data: {id: 1},
      read: true,
      date: new Date('2024-07-15T16:00:00Z'),
    },
    {
      id: '5',
      title: 'Transaction Successful',
      description: 'Your transaction of $234 was successful.',
      category: '2',
      type: 'page',
      page: 'Connections',
      read: false,
      date: new Date('2024-07-14T18:00:00Z'),
    },
    {
      id: '6',
      title: 'Special Offer!',
      description: 'Get 20% off on your next purchase.',
      category: '3',
      type: 'none',
      read: false,
      date: new Date('2024-07-13T20:00:00Z'),
    },
    {
      id: '7',
      title: 'Special Offer!',
      description: 'Get 10% off on your next purchase.',
      category: '3',
      type: 'none',
      read: true,
      date: new Date('2024-07-12T22:00:00Z'),
    },
  ]);

  const filteredNotifications = notifications
    .filter(notification => notification.category === selectedCategory)
    .sort((a, b) => b.date - a.date);

  const handleNotificationPress = notification => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notif =>
        notif.id === notification.id ? {...notif, read: true} : notif,
      ),
    );

    switch (notification.type) {
      case 'link':
        Linking.openURL(notification.url).catch(err =>
          console.error('Failed to open link', err),
        );
        break;
      case 'page':
        navigation.navigate(notification.page);
        break;
      case 'pageWithData':
        navigation.navigate(notification.page, {data: notification.data});
        break;
      case 'none':
        Alert.alert(notification.title, notification.description);
        break;
      default:
        console.warn('Unknown notification type:', notification.type);
    }
  };

  const getTimeAgo = date => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tagsContainer}>
        {notificationCategory.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.tag,
              selectedCategory === category.id && styles.selectedTag,
            ]}
            onPress={() => setSelectedCategory(category.id)}>
            <Text
              style={[
                styles.tagText,
                selectedCategory === category.id && styles.selectedTagText,
              ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredNotifications}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.notificationItem,
              item.read ? styles.readNotification : styles.unreadNotification,
            ]}
            onPress={() => handleNotificationPress(item)}>
            <View style={styles.notificationContent}>
              <View style={styles.notificationTextContainer}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationDescription}>
                  {item.description}
                </Text>
              </View>
              <Text style={styles.notificationDate}>
                {getTimeAgo(new Date(item.date))}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    tagsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    tag: {
      padding: 10,
      borderRadius: 20,
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    selectedTag: {
      backgroundColor: theme.colors.primary,
    },
    tagText: {
      fontSize: 16,
      color: theme.colors.text,
    },
    selectedTagText: {
      color: theme.colors.white,
    },
    notificationItem: {
      padding: 15,
      backgroundColor: theme.colors.background,
      borderRadius: 10,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    readNotification: {
      backgroundColor: theme.colors.lightGrey,
    },
    unreadNotification: {
      backgroundColor: theme.colors.background,
    },
    notificationContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    notificationTextContainer: {
      flex: 1,
      marginRight: 10,
    },
    notificationTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    notificationDescription: {
      fontSize: 14,
      color: theme.colors.text,
    },
    notificationDate: {
      fontSize: 12,
      color: theme.colors.text,
    },
  });

export default NotificationScreen;
