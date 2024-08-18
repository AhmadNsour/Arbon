import {
  RESET_SETTINGS,
  TOGGLE_IS_FIRST_TIME_USER,
  TOGGLE_PUSH_NOTIFICATION,
  TOGGLE_FACE_ID,
  SET_LANGUAGE,
  TOGGLE_THEME,
} from '../actions/settingsActions';

const initialState = {
  isDarkMode: false,
  language: 'en',
  faceIdEnabled: false,
  pushNotificationEnabled: false,
  isFirstTimeUser: true,
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
    case TOGGLE_FACE_ID:
      return {
        ...state,
        faceIdEnabled: !state.faceIdEnabled,
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
    default:
      return state;
  }
};

export default settingsReducer;
