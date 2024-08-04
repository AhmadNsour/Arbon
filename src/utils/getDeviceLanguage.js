import * as RNLocalize from 'react-native-localize';

export const getDeviceLanguage = () => {
  const locales = RNLocalize.getLocales();
  return locales[0]?.languageTag || 'en-US';
};
