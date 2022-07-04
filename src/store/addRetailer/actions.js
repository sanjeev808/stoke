import {
    ADD_RETAILER,
    ADD_RETAILER_SUCCESS,
    ADD_RETAILER_FAIL
  } from "./actionTypes"
  
  export const addRetailer = (project) => ({
    type: ADD_RETAILER,
    payload: project,
  })
  
  export const addRetailerSuccess = project => ({
    type: ADD_RETAILER_SUCCESS,
    payload: project.data,
  })
  
  export const addRetailerFail = error => ({
    type: ADD_RETAILER_FAIL,
    payload: error,
  })
  