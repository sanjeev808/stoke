import {
    UPDATE_USER_NOTIFICATION_FAIL,
    UPDATE_USER_NOTIFICATION_SUCCESS
    } from "./actionTypes";
    
    const INIT_STATE = {
      upadateNotification: [],
    };
    
    const updateUserNotification = (state = INIT_STATE, action , data) => {
      switch (action.type) {
        case UPDATE_USER_NOTIFICATION_SUCCESS:
          return {
            ...state,
            upadateNotification: action.payload,
          };
    
        case UPDATE_USER_NOTIFICATION_FAIL:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return state;
      }
    };
    
    export default updateUserNotification;
    