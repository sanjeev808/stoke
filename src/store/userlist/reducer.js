import {
GET_USER_FAIL,
GET_USER_SUCCESS
} from "./actionTypes";

const INIT_STATE = {
  users: [],
};

const Userlist = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };

    case GET_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default Userlist;
