import {
    GET_ADVERTISEMENT_STATUS,
    GET_ADVERTISEMENT_STATUS_SUCCESS,
    GET_ADVERTISEMENT_STATUS_FAIL
  } from "./actionTypes"
  
  export const getAdvertisementStatus = (data) => ({
    type: GET_ADVERTISEMENT_STATUS,
    payload:data,
  })
  
  export const getAdvertisementStatusSuccess = users => ({
    type: GET_ADVERTISEMENT_STATUS_SUCCESS,
    payload: users.data,
  })
  
  export const getAdvertisementStatusFail = error => ({
    type: GET_ADVERTISEMENT_STATUS_FAIL,
    payload: error,
  })
  