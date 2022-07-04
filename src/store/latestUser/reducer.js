import {
    GET_LATEST_USER_FAIL,
    GET_LATEST_USER_SUCCESS
    } from "./actionTypes";
    
    const INIT_STATE = {
      Latestusers: [],
    };
    
    const latestUserList = (state = INIT_STATE, action , data) => {
      switch (action.type) {
        case GET_LATEST_USER_SUCCESS:
          return {
            ...state,
            Latestusers: action.payload,
          };
    
        case GET_LATEST_USER_FAIL:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return state;
      }
    };
    
    export default latestUserList;
    