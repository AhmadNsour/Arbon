// src/redux/reducers.js
import {combineReducers} from 'redux';
import {SET_USER} from './actions';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  user: userReducer,
});
