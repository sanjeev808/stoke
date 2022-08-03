import {
    EDIT_RETAILER_FAIL,
    EDIT_RETAILER_SUCCESS
    } from "./actionTypes";
    
    const INIT_STATE = {
      editretailer: {},
    };
    
    const editretailer = (state = INIT_STATE, action) => {
      switch (action.type) {
        case EDIT_RETAILER_SUCCESS:
          return {
            ...state,
            editretailer: action.payload,
          };
    
        case EDIT_RETAILER_FAIL:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return state;
      }
    };
    
    export default editretailer;
    