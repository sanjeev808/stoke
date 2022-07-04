import {
    UPDATE_USER_NOTIFICATION,
    UPDATE_USER_NOTIFICATION_SUCCESS,
    UPDATE_USER_NOTIFICATION_FAIL
  } from "./actionTypes"
  
  export const updateUserNotification = (data) => ({
    type: UPDATE_USER_NOTIFICATION,
    payload:data,
  })
  
  export const updateUserNotificationSuccess = users => ({
    type: UPDATE_USER_NOTIFICATION_SUCCESS,
    payload: users.data,
  })
  
  export const updateUserNotificationFail = error => ({
    type: UPDATE_USER_NOTIFICATION_FAIL,
    payload: error,
  })
  