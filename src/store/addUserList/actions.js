import {
    ADD_USER,
    ADD_USER_SUCCESS,
    ADD_USER_FAIL
  } from "./actionTypes"
  
  export const addusers = (project) => ({
    type: ADD_USER,
    payload: project,
  })
  
  export const addUserSuccess = project => ({
    type: ADD_USER_SUCCESS,
    payload: project.data,
  })
  
  export const addUsersFail = error => ({
    type: ADD_USER_FAIL,
    payload: error,
  })
  