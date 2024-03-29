import {
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAIL
} from "./actionTypes"

export const getusers = (data) => ({
  type: GET_USER,
  payload:data,
})

export const getUserSuccess = users => ({
  type: GET_USER_SUCCESS,
  payload: users.data,
})

export const getUsersFail = error => ({
  type: GET_USER_FAIL,
  payload: error,
})
