import {
    GET_SUPPORT_FAIL,
    GET_SUPPORT_SUCCESS
    } from "./actionTypes";
    
    const INIT_STATE = {
      support: [],
    };
    
    const SupportList = (state = INIT_STATE, action , data) => {
      switch (action.type) {
        case GET_SUPPORT_SUCCESS:
          return {
            ...state,
            support: action.payload,
          };
    
        case GET_SUPPORT_FAIL:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return state;
      }
    };
    
    export default SupportList;
    