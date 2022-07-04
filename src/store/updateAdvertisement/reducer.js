import {
    UPDATE_ADVERTISEMENT_FAIL,
    UPDATE_ADVERTISEMENT_SUCCESS
    } from "./actionTypes";
    
    const INIT_STATE = {
      upadateAdvertisement: [],
    };
    
    const updateAdvertisement = (state = INIT_STATE, action , data) => {
      switch (action.type) {
        case UPDATE_ADVERTISEMENT_SUCCESS:
          return {
            ...state,
            upadateAdvertisement: action.payload,
          };
    
        case UPDATE_ADVERTISEMENT_FAIL:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return state;
      }
    };
    
    export default updateAdvertisement;
    