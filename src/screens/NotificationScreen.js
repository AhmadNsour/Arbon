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
import {useTheme} from '../theme/ThemeProvider';

const NotificationScreen = ({navigation}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  const [selectedCategory, setSelectedCategory] = useState('1');

  const notificationCategory = [
    {id: '1', name: 'General'},
    {id: '2', name: 'Transactions'},
    {id: '3', name: 'Offers'},
  ];

  const notifications = [
    {
      id: '1',
      title: 'New Update Available',
      description: 'Version 1.1.0 is now available for download.',
      category: '1',
      type: 'link',
      url: 'https://example.com/update',
    },
    {
      id: '2',
      title: 'Welcome to our App',
      description: 'Thank you for joining us!',
      category: '1',
      type: 'none',
    },
    {
      id: '3',
      title: 'Transaction Successful',
      description: 'Your recent transaction of $1000 was successful.',
      category: '2',
      type: 'page',
      page: 'Transactions',
    },
    {
      id: '4',
      title: 'Transaction Failed',
      description: 'The transaction of $1000 failed',
      category: '2',
      type: 'pageWithData',
      page: 'Transactions',
      data: {id: 1},
    },
    {
      id: '4',
      title: 'Special Offer!',
      description: 'Get 20% off on your next purchase.',
      category: '3',
      type: 'none',
    },
  ];

  const filteredNotifications = notifications.filter(
    notification => notification.category === selectedCategory,
  );

  const handleNotificationPress = notification => {
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
            style={styles.notificationItem}
            onPress={() => handleNotificationPress(item)}
            disabled={item.type === 'none'}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationDescription}>
              {item.description}
            </Text>
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
    notificationTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    notificationDescription: {
      fontSize: 14,
      color: theme.colors.text,
    },
  });

export default NotificationScreen;
