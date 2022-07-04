import {
    UPDATE_ADVERTISEMENT,
    UPDATE_ADVERTISEMENT_SUCCESS,
    UPDATE_ADVERTISEMENT_FAIL
  } from "./actionTypes"
  
  export const updateAdvertisement = (data) => ({
    type: UPDATE_ADVERTISEMENT,
    payload:data,
  })
  
  export const updateAdvertisementSuccess = users => ({
    type: UPDATE_ADVERTISEMENT_SUCCESS,
    payload: users.data,
  })
  
  export const updateAdvertisementFail = error => ({
    type: UPDATE_ADVERTISEMENT_FAIL,
    payload: error,
  })
  