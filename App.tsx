// App.js
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator';
import store from './src/redux/store';
import {ThemeProvider} from './src/theme/ThemeProvider';
import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const App = () => {
  useEffect(() => {
    // Configure PushNotification
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // IOS ONLY: (optional) default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // IOS ONLY: (optional) default: true - Specified if permissions will be requested or not,
      // if not, you must call PushNotificationIOS.requestPermissions() later
      requestPermissions: Platform.OS === 'ios',
    });

    // Request permission for notifications
    if (Platform.OS === 'android') {
      requestNotificationPermission();
    }
  }, []);

  const requestNotificationPermission = () => {
    // Check for permission
    PushNotification.checkPermissions(permissions => {
      if (!permissions.alert) {
        // Request permission if not granted
        PushNotification.requestPermissions();
      }
    });
  };

  return (
    <ThemeProvider>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
