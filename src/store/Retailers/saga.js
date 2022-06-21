import { call, put, takeEvery } from "redux-saga/effects";

// Ecommerce Redux States
import {
GET_RETAILER,
} from "./actionTypes";
import {
getRetailerSuccess,
getRetailerFail
} from "./actions";

//Include Both Helper File with needed methods
import {
    getRetailer,
} from "helpers/fakebackend_helper";


function* fetchOrders() {
 
  try {
    const response = yield call(getRetailer);
    console.log("get reponse", response)
    yield put(getRetailerSuccess(response));
  } catch (error) {
    console.log(error,"getError" )
    yield put(getRetailerFail(error));
  }
} 
function* retaileruserSaga() {
  yield takeEvery(GET_RETAILER, fetchOrders);
}

export default retaileruserSaga;
