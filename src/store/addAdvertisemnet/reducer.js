
import {
    ADD_ADVERTISEMENT_FAIL,
    ADD_ADVERTISEMENT_SUCCESS
    } from "./actionTypes";
    
    const INIT_STATE = {
      addAdvertisement: [],
    };
    
    const addAdvertisement = (state = INIT_STATE, action) => {
      switch (action.type) {
        case ADD_ADVERTISEMENT_SUCCESS:
          return {
            ...state,
            addAdvertisement: action.payload,
          };
    
        case ADD_ADVERTISEMENT_FAIL:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return state;
      }
    };
    
    export default addAdvertisement;
    
  
  