import { call, put, takeEvery } from "redux-saga/effects";

// Ecommerce Redux States
import {
  GET_USER,
} from "./actionTypes";
import {
 getUserSuccess,
 getUsersFail
} from "./actions";

//Include Both Helper File with needed methods
import {
  getUser,
} from "helpers/fakebackend_helper";


function* fetchOrders() {
 
  try {
    const response = yield call(getUser);
    yield put(getUserSuccess(response));
  } catch (error) {
    console.log(error,"getError" )
    yield put(getUsersFail(error));
  }
}
function* userSaga() {
  yield takeEvery(GET_USER, fetchOrders);
}

export default userSaga;
