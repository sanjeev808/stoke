
  import {
    GET_ADVERTISMENT,
    GET_ADVERTISMENT_SUCCESS,
    GET_ADVERTISMENT_FAIL
  } from "./actionTypes"
  
  export const getadvertisment = (data) => ({
    type: GET_ADVERTISMENT,
    payload:data,
  })
  
  export const getadvertismentSuccess = users => ({
    type: GET_ADVERTISMENT_SUCCESS,
    payload: users.data,
  })
  
  export const getadvertismentFail = error => ({
    type: GET_ADVERTISMENT_FAIL,
    payload: error,
  })
  