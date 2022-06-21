import {
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAIL
} from "./actionTypes"

export const getusers = () => ({
  type: GET_USER,
})

export const getUserSuccess = users => ({
  type: GET_USER_SUCCESS,
  payload: users.data,
})

export const getUsersFail = error => ({
  type: GET_USER_FAIL,
  payload: error,
})
