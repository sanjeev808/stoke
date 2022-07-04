import { call, put, takeEvery } from "redux-saga/effects";

// Ecommerce Redux States
import {
  GET_SUPPORT,
} from "./actionTypes";
import {
 getSupportSuccess,
 getSupportsFail
} from "./actions";

//Include Both Helper File with needed methods
import {
  getSupport,
} from "helpers/fakebackend_helper";


function* fetchOrders({payload:data}) {
 
  try {
    const response = yield call(getSupport,data);
    yield put(getSupportSuccess(response));
  } catch (error) {
    console.log(error,"getError" )
    yield put(getSupportsFail(error));
  }  
}
function* supportSaga() {
  yield takeEvery(GET_SUPPORT, fetchOrders);
}

export default supportSaga;
