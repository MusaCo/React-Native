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
  } else if (action.type == "FOLLOW") {
    console.log(action.id);
    return {
      ...state,
      currentUser: {
        ...state.currentUser,
        followings: [...state.currentUser.followings, action.id],
      },
    };
  } else {
    return state;
  }
};

const Reducers = combineReducers({
  userState: user,
});

export default Reducers;
