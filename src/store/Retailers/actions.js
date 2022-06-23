import {
    GET_RETAILER,
    GET_RETAILER_SUCCESS,
    GET_RETAILER_FAIL
  } from "./actionTypes"
  
  export const getRetailer = (data) => ({
    type: GET_RETAILER,
    payload:data,
  })
  
  export const getRetailerSuccess = users => ({
    type: GET_RETAILER_SUCCESS,
    payload: users.data,
  })
  
  export const getRetailerFail = error => ({
    type: GET_RETAILER_FAIL,
    payload: error,
  })
  