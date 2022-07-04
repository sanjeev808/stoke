import {
    ADD_ADVERTISEMENT,
    ADD_ADVERTISEMENT_SUCCESS,
    ADD_ADVERTISEMENT_FAIL
  } from "./actionTypes"
  
  export const addAdvertisement = (project) => ({
    type: ADD_ADVERTISEMENT,
    payload: project,
  })
  
  export const addAdvertisementSuccess = project => ({
    type: ADD_ADVERTISEMENT_SUCCESS,
    payload: project.data,
  })
  
  export const addAdvertisementFail = error => ({
    type: ADD_ADVERTISEMENT_FAIL,
    payload: error,
  })
  