import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator';
import {PersistGate} from 'redux-persist/integration/react';
import {ThemeProvider} from './src/theme/ThemeProvider';
import {Platform, I18nManager, StyleSheet, View} from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {I18nextProvider} from 'react-i18next';
import i18n from './src/locales/i18n';
import {LoadingProvider} from './src/context/LoadingContext';
import LoadingOverlay from './src/components/LoadingOverlay';
import {store, persistor} from './src/store/store';
import codePush from 'react-native-code-push';

// Code Push configuration

const App = () => {
  const [isRTL, setIsRTL] = useState(I18nManager.isRTL);

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      const newIsRTL = lng === 'ar';
      I18nManager.forceRTL(newIsRTL);
      setIsRTL(newIsRTL);
    };

    i18n.on('languageChanged', handleLanguageChange);

    handleLanguageChange(i18n.language);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);
  useEffect(() => {
    codePush.sync({
      updateDialog: {
        title: 'Update Available',
        optionalUpdateMessage: 'An update is available. Install?',
        optionalInstallButtonLabel: 'Yes',
      },
      installMode: codePush.InstallMode.IMMEDIATE,
    });
  }, []);

  useEffect(() => {
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
    <LoadingProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <I18nextProvider i18n={i18n}>
              <View style={isRTL ? styles.containerRTL : styles.container}>
                <AppNavigator />
                <LoadingOverlay />
              </View>
            </I18nextProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </LoadingProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerRTL: {
    flex: 1,
    direction: 'rtl',
  },
});

export default codePush(App);
