import {
    EDIT_RETAILER,
    EDIT_RETAILER_SUCCESS,
    EDIT_RETAILER_FAIL
  } from "./actionTypes"
  
  export const editRetailer = (project) => ({
    type: EDIT_RETAILER,
    payload: project,
  }) 
  
  export const editRetailerSuccess = project => ({
    type: EDIT_RETAILER_SUCCESS,
    payload: project.data,
  })
  
  export const editRetailerFail = error => ({
    type: EDIT_RETAILER_FAIL,
    payload: error,
  })
  