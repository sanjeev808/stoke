import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
} from "./actionTypes"

const initialState = {
  userDetails: null,

  // status: "idle",
  // otp: null,
  // userList: null,
  // latestUsersList: null,
  // retailersList: null,
  // notificationsList: null,
};

const login = (state = initialState, action) => {
  // debugger
  // console.log(action,"sanjeev")
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        userDetails : action.payload,
        loading: true,
      }
      break
    case LOGIN_SUCCESS:
      state = {
        ...state,
        userDetails : action.payload,
        loading: false,
      }
      break
    case LOGOUT_USER:
      state = { ...state }
      break
    case LOGOUT_USER_SUCCESS:
      state = { ...state }
      break
    case API_ERROR:
      state = { ...state, error: action.payload, loading: false }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default login
