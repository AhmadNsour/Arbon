import {
  RESET_SETTINGS,
  TOGGLE_IS_FIRST_TIME_USER,
  TOGGLE_PUSH_NOTIFICATION,
  TOGGLE_BIOMETRIC_LOGIN,
  SET_LANGUAGE,
  TOGGLE_THEME,
  TOGGLE_BALANCE,
} from '../actions/settingsActions';

const initialState = {
  isDarkMode: false,
  language: 'en',
  biometricLoginEnabled: false,
  pushNotificationEnabled: false,
  isFirstTimeUser: true,
  isBalanceVisible: false,
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      };
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    case TOGGLE_BIOMETRIC_LOGIN:
      return {
        ...state,
        biometricLoginEnabled: !state.biometricLoginEnabled,
      };
    case TOGGLE_PUSH_NOTIFICATION:
      return {
        ...state,
        pushNotificationEnabled: !state.pushNotificationEnabled,
      };
    case TOGGLE_IS_FIRST_TIME_USER:
      return {
        ...state,
        isFirstTimeUser: !state.isFirstTimeUser,
      };
    case RESET_SETTINGS:
      return initialState;
    case TOGGLE_BALANCE:
      return {
        ...state,
        isBalanceVisible: !state.isBalanceVisible,
      };
    default:
      return state;
  }
};

export default settingsReducer;
