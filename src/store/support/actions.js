import {
    GET_SUPPORT,
    GET_SUPPORT_SUCCESS,
    GET_SUPPORT_FAIL
  } from "./actionTypes"
  
  export const getSupport = (data) => ({
    type: GET_SUPPORT,
    payload:data,
  })
  
  export const getSupportSuccess = users => ({
    type: GET_SUPPORT_SUCCESS,
    payload: users.data,
  })
  
  export const getSupportsFail = error => ({
    type: GET_SUPPORT_FAIL,
    payload: error,
  })
  