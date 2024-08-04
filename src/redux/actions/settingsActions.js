// actions/settingsActions.js
export const TOGGLE_THEME = 'TOGGLE_THEME';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const TOGGLE_FACE_ID = 'TOGGLE_FACE_ID';
export const TOGGLE_PUSH_NOTIFICATION = 'TOGGLE_PUSH_NOTIFICATION';

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

export const toggleFaceId = () => {
  return {
    type: TOGGLE_FACE_ID,
  };
};

export const togglePushNotification = () => {
  return {
    type: TOGGLE_PUSH_NOTIFICATION,
  };
};
