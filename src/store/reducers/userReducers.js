import {SET_USER} from '../actions/userActions';

const initialState = {
  user: null,
  isloggedIn: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;

    default:
      return state;
  }
};

export default userReducer;
