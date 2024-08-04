const initialState = {
  isDarkMode: false,
  language: 'en',
  faceIdEnabled: false,
  pushNotificationEnabled: false,
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      };
    case 'SET_LANGUAGE':
      return {
        ...state,
        language: action.payload,
      };
    case 'TOGGLE_FACE_ID':
      return {
        ...state,
        faceIdEnabled: !state.faceIdEnabled,
      };
    case 'TOGGLE_PUSH_NOTIFICATION':
      return {
        ...state,
        pushNotificationEnabled: !state.pushNotificationEnabled,
      };
    default:
      return state;
  }
};

export default settingsReducer;
