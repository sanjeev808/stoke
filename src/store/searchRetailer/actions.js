import {
    SEARCH_RETAILER,
    SEARCH_RETAILER_SUCCESS,
    SEARCH_RETAILER_FAIL
  } from "./actionTypes"
  
  export const searchretailer = (data) => ({
    type: SEARCH_RETAILER,
    payload:data,
  })
  
  export const searchretailerSuccess = users => ({
    type: SEARCH_RETAILER_SUCCESS,
    payload: users.data,
  })
  
  export const searchretailersFail = error => ({
    type: SEARCH_RETAILER_FAIL,
    payload: error,
  })
  