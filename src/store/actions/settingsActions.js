// actions/settingsActions.js
export const TOGGLE_THEME = 'TOGGLE_THEME';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const TOGGLE_BIOMETRIC_LOGIN = 'TOGGLE_BIOMETRIC_LOGIN';
export const TOGGLE_PUSH_NOTIFICATION = 'TOGGLE_PUSH_NOTIFICATION';
export const TOGGLE_IS_FIRST_TIME_USER = 'TOGGLE_IS_FIRST_TIME_USER';
export const RESET_SETTINGS = 'RESET_SETTINGS';
export const TOGGLE_BALANCE = 'TOGGLE_BALANCE';

export const toggleTheme = () => {
  return {
    type: TOGGLE_THEME,
  };
};

export const setLanguage = language => {
  return {
    type: SET_LANGUAGE,
    payload: language,
  };
};

export const toggleBiometricLogin = () => {
  return {
    type: TOGGLE_BIOMETRIC_LOGIN,
  };
};

export const togglePushNotification = () => {
  return {
    type: TOGGLE_PUSH_NOTIFICATION,
  };
};

export const toggleIsFirstTimeUser = () => {
  return {
    type: TOGGLE_IS_FIRST_TIME_USER,
  };
};

export const resetSettings = () => {
  return {
    type: RESET_SETTINGS,
  };
};

export const toggleBalance = () => {
  return {
    type: TOGGLE_BALANCE,
  };
};
