import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator';
import store from './src/redux/store';
import {ThemeProvider} from './src/theme/ThemeProvider';
import {Platform, I18nManager, StyleSheet, View} from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {I18nextProvider} from 'react-i18next';
import i18n from './src/locales/i18n';

const App = () => {
  const [isRTL, setIsRTL] = useState(I18nManager.isRTL);

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      const newIsRTL = lng === 'ar';
      I18nManager.forceRTL(newIsRTL);
      setIsRTL(newIsRTL);
    };

    i18n.on('languageChanged', handleLanguageChange);

    // Initial configuration
    handleLanguageChange(i18n.language);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  useEffect(() => {
    // Configure PushNotification
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      requestPermissions: Platform.OS === 'ios',
    });

    if (Platform.OS === 'android') {
      requestNotificationPermission();
    }
  }, []);

  const requestNotificationPermission = () => {
    PushNotification.checkPermissions(permissions => {
      if (!permissions.alert) {
        PushNotification.requestPermissions();
      }
    });
  };

  return (
    <ThemeProvider>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <View style={isRTL ? styles.containerRTL : styles.container}>
            <AppNavigator />
          </View>
        </Provider>
      </I18nextProvider>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // additional styles
  },
  containerRTL: {
    flex: 1,
    direction: 'rtl',
    // additional styles for RTL
  },
});

export default App;
