import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
} from "./actionTypes"

const initialState = {
  userDetails: {},


};

const login = (state = initialState, action) => {
  // debugger
  // console.log(state,"login state-----**********")
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
