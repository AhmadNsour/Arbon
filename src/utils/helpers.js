import {Dimensions, Linking, Platform} from 'react-native';
import {check, PERMISSIONS} from 'react-native-permissions';

export const hasPhotosAccess = () => {
  if (Platform.OS === 'android') {
    check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(data => {
      return data === 'granted' || data === 'limited';
    });
  } else {
    check(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY).then(data => {
      return data === 'granted' || data === 'limited';
    });
  }
  return true;
};

export const linkWebsite = website => {
  website.includes('http')
    ? Linking.openURL(website)
    : Linking.openURL('http://' + website);
};

export const linkPhone = phone => {
  Linking.openURL(`tel:${phone.replace(' ', '')}`);
};

export const linkEmail = email => {
  Linking.openURL(`mailto:${email}`);
};

export const isIOS = Platform.OS === 'ios';

export const SCREEN_WIDTH = Dimensions.get('window').width;

export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const {width, height} = Dimensions.get('screen');

export const renderBase64 = 'data:image/png;base64,';

const b64chars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

export const encodeBase64 = input => {
  let str = input;
  let output = '';
  let i = 0;

  while (i < str.length) {
    const char1 = str.charCodeAt(i++);
    const char2 = i < str.length ? str.charCodeAt(i++) : Number.NaN;
    const char3 = i < str.length ? str.charCodeAt(i++) : Number.NaN;

    const enc1 = Math.floor(char1 / 4);
    const enc2 = (char1 % 4) * 16 + Math.floor(char2 / 16);
    const enc3 = (char2 % 16) * 4 + Math.floor(char3 / 64);
    const enc4 = char3 % 64;

    if (isNaN(char2)) {
      output += b64chars.charAt(enc1) + b64chars.charAt(enc2) + '==';
    } else if (isNaN(char3)) {
      output +=
        b64chars.charAt(enc1) +
        b64chars.charAt(enc2) +
        b64chars.charAt(enc3) +
        '=';
    } else {
      output +=
        b64chars.charAt(enc1) +
        b64chars.charAt(enc2) +
        b64chars.charAt(enc3) +
        b64chars.charAt(enc4);
    }
  }

  return output;
};

export const convertArabicNumbers = number => {
  const arabicNumbers = ['۰', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  const chars = number.toString().split('');
  for (let i = 0; i < chars.length; i++) {
    if (/\d/.test(chars[i])) {
      chars[i] = arabicNumbers[Number(chars[i])];
    }
  }
  return chars.join('');
};

export const convertArabicNumberToEnglish = number => {
  return number
    .replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d) {
      return d.charCodeAt(0) - 1632 + '';
    })
    .replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function (d) {
      return d.charCodeAt(0) - 1776 + '';
    });
};

export const formatNumber = (numb, fixedDecimals = true) => {
  let num = Number(numb);
  let formattedAmount = fixedDecimals ? num.toFixed(2) : num.toString();
  formattedAmount = formattedAmount.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  if (formattedAmount[formattedAmount.length - 1] === '.') {
    formattedAmount = formattedAmount.slice(0, -1);
  }
  return formattedAmount;
};

export const maskNumber = value => {
  if (!value) {
    return '**********';
  } else {
    return value.slice(0, 2) + '********';
  }
};
