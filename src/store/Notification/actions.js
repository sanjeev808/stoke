import {
    GET_USER_NOTIFICATION,
    GET_USER_NOTIFICATION_SUCCESS,
    GET_USER_NOTIFICATION_FAIL
  } from "./actionTypes"
  
  export const getusersNotification = () => ({
    type: GET_USER_NOTIFICATION,
  })
  
  export const getusersNotificationSuccess = users => ({
    type: GET_USER_NOTIFICATION_SUCCESS,
    payload: users.data,
  })
  
  export const getusersNotificationFail = error => ({
    type: GET_USER_NOTIFICATION_FAIL
    ,
    payload: error,
  })
  