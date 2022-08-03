import {
    EDIT_USER_FAIL,
    EDIT_USER_SUCCESS
    } from "./actionTypes";
    
    const INIT_STATE = {
      editusers: [],
    };
    
    const editUser = (state = INIT_STATE, action) => {
      console.log("actions data2323223434",action)
      switch (action.type) {
        case EDIT_USER_SUCCESS:
          return {
            ...state,
            editusers: action.payload,
          };
    
        case EDIT_USER_FAIL:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return state;
      }
    };
    
    export default editUser;
    