import { call, put, takeEvery } from "redux-saga/effects";

// Ecommerce Redux States
import {
  GET_ADVERTISEMENT_STATUS,
} from "./actionTypes";
import {
    getAdvertisementStatusSuccess,
    getAdvertisementStatusFail
} from "./actions";

//Include Both Helper File with needed methods
import {
    getAdvertisementStatus,
} from "helpers/fakebackend_helper";


function* fetchOrders({payload:data}) {
 
  try {
    const response = yield call(getAdvertisementStatus,data);
    yield put(getAdvertisementStatusSuccess(response));
  } catch (error) {
    console.log(error,"getError" )
    yield put(getAdvertisementStatusFail(error));
  }  
}
function* AdvertisementStatusSaga() {
  yield takeEvery(GET_ADVERTISEMENT_STATUS, fetchOrders);
}

export default AdvertisementStatusSaga;
