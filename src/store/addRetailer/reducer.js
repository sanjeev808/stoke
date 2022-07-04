
import {
  ADD_RETAILER_FAIL,
  ADD_RETAILER_SUCCESS
  } from "./actionTypes";
  
  const INIT_STATE = {
    addusers: [],
  };
  
  const addRetailer = (state = INIT_STATE, action) => {
    switch (action.type) {
      case ADD_RETAILER_SUCCESS:
        return {
          ...state,
          addusers: action.payload,
        };
  
      case ADD_RETAILER_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default addRetailer;
  

