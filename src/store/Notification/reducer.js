import {
  GET_USER_NOTIFICATION_FAIL,
  GET_USER_NOTIFICATION_SUCCESS
    } from "./actionTypes";
    
    const INIT_STATE = {
      users: [],
    };
    
    const UserNotificationlist = (state = INIT_STATE, action) => {
      switch (action.type) {
        case GET_USER_NOTIFICATION_SUCCESS:
          return {
            ...state,
            users: action.payload,
          };
    
        case GET_USER_NOTIFICATION_FAIL:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return state;
      }
    };
    
    export default UserNotificationlist;
    