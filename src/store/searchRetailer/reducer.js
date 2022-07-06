import {
    SEARCH_RETAILER_FAIL,
    SEARCH_RETAILER_SUCCESS
    } from "./actionTypes";
    
    const INIT_STATE = {
      searchRetailer: [],
    };
    
    const searchRetailer = (state = INIT_STATE, action , data) => {
      switch (action.type) {
        case SEARCH_RETAILER_SUCCESS:
          return {
            ...state,
            users: action.payload,
          };
    
        case SEARCH_RETAILER_FAIL:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return state;
      }
    };
    
    export default searchRetailer;
    