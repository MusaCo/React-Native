import { combineReducers } from "redux";
//import { user } from "./user";

const initialState = {
  currentUser: null,
};

const user = (state = initialState, action) => {
  if (action.type == "USER_STATE_CHANGE") {
    return {
      ...state,
      currentUser: action.currentUser,
    };
  } else {
    return state;
  }
};

const Reducers = combineReducers({
  userState: user,
});

export default Reducers;
