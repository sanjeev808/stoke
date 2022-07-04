import {
    EDIT_USER,
    EDIT_USER_SUCCESS,
    EDIT_USER_FAIL
  } from "./actionTypes"
  
  export const editusers = (project) => ({
    type: EDIT_USER,
    payload: project,
  })
  
  export const editUserSuccess = project => ({
    type: EDIT_USER_SUCCESS,
    payload: project.data,
  })
  
  export const editUsersFail = error => ({
    type: EDIT_USER_FAIL,
    payload: error,
  })
  