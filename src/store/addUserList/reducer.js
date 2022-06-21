import {
    ADD_USER_FAIL,
    ADD_USER_SUCCESS
    } from "./actionTypes";
    
    const INIT_STATE = {
      addusers: [],
    };
    
    const addUser = (state = INIT_STATE, action) => {
      switch (action.type) {
        case ADD_USER_SUCCESS:
          return {
            ...state,
            addusers: action.payload,
          };
    
        case ADD_USER_FAIL:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return state;
      }
    };
    
    export default addUser;
    