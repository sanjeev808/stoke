import {
    GET_RETAILER_FAIL,
    GET_RETAILER_SUCCESS
    } from "./actionTypes";
    
    const INIT_STATE = {
      retailer: [],
    };
    
    const RetailerList = (state = INIT_STATE, action) => {
      console.log("5560",state)
      switch (action.type) {
        case GET_RETAILER_SUCCESS:
          return {
            ...state,
            retailer: action.payload,
          };
    
        case GET_RETAILER_FAIL:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return state;
      }
    };
    
    export default RetailerList;
    