import {
    EDIT_RETAILER,
    EDIT_RETAILER_SUCCESS,
    EDIT_RETAILER_FAIL
  } from "./actionTypes"
  
  export const Editretailer = (project) => ({
    type: EDIT_RETAILER,
    payload: project,
  })
  
  export const editretailerSuccess = project => ({
    type: EDIT_RETAILER_SUCCESS,
    payload: project.data,
  })
  
  export const editretailerFail = error => ({
    type: EDIT_RETAILER_FAIL,
    payload: error,
  })
  