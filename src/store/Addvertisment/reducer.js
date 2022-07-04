import {
  GET_ADVERTISMENT_FAIL,
  GET_ADVERTISMENT_SUCCESS
  } from "./actionTypes";
  
  const INIT_STATE = {
    Advertisement: [],
  };
  
  const getAdvertisement = (state = INIT_STATE, action , data) => {
    switch (action.type) {
      case GET_ADVERTISMENT_SUCCESS:
        return {
          ...state,
          Advertisement: action.payload,
        };
  
      case GET_ADVERTISMENT_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default getAdvertisement;
  