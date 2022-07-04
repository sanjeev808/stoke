import {
    GET_LATEST_USER,
    GET_LATEST_USER_SUCCESS,
    GET_LATEST_USER_FAIL
  } from "./actionTypes"
  
  export const getlatestusers = (data) => ({
    type: GET_LATEST_USER,
    payload:data,
  })
  
  export const getlatestUserSuccess = users => ({
    type: GET_LATEST_USER_SUCCESS,
    payload: users.data,
  })
  
  export const getlatestUsersFail = error => ({
    type: GET_LATEST_USER_FAIL,
    payload: error,
  })
  