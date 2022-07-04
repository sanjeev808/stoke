import {
    GET_ADVERTISEMENT_STATUS_FAIL,
    GET_ADVERTISEMENT_STATUS_SUCCESS
    } from "./actionTypes";
    
    const INIT_STATE = {
      advertisementStatus: [],
    };
    
    const AdvertisementStatus = (state = INIT_STATE, action , data) => {
      switch (action.type) {
        case GET_ADVERTISEMENT_STATUS_SUCCESS:
          return {
            ...state,
            users: action.payload,
          };
    
        case GET_ADVERTISEMENT_STATUS_FAIL:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return state;
      }
    };
    
    export default AdvertisementStatus;
    