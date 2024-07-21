import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './en.json';
import ar from './ar.json';

i18next.use(initReactI18next).init({
  lng: 'en', // default language
  fallbackLng: 'en',
  resources: {
    en: {
      translation: en,
    },
    ar: {
      translation: ar,
    },
  },
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
  cache: {
    enabled: true,
    expirationTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    versions: {
      en: 'v1.0',
      ar: 'v1.0',
    },
    store: AsyncStorage,
  },
});

export default i18next;
