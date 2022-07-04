import { call, put, takeEvery } from "redux-saga/effects";

// Ecommerce Redux States
import {
    GET_LATEST_USER,
} from "./actionTypes";
import {
    getlatestUserSuccess,
    getlatestUsersFail
} from "./actions";

//Include Both Helper File with needed methods
import {
  getLatestUser,
} from "helpers/fakebackend_helper";


function* fetchOrders({payload:data}) {
 
  try {
    const response = yield call(getLatestUser,data);
    yield put(getlatestUserSuccess(response));
  } catch (error) {
    console.log(error,"getError" )
    yield put(getlatestUsersFail(error));
  }  
}
function* LatestUserSaga() {
  yield takeEvery(GET_LATEST_USER, fetchOrders);
}

export default LatestUserSaga;
