import { call, put, takeEvery } from "redux-saga/effects";

// Ecommerce Redux States
import {
    UPDATE_ADVERTISEMENT,
} from "./actionTypes";
import {
    updateAdvertisementSuccess,
    updateAdvertisementFail
} from "./actions";

//Include Both Helper File with needed methods
import {
    updateAdvertisment,
} from "helpers/fakebackend_helper";


function* fetchOrders({payload:data}) {
 
  try {
    const response = yield call(updateAdvertisment,data);
    yield put(updateAdvertisementSuccess(response));
  } catch (error) {
    console.log(error,"getError" )
    yield put(updateAdvertisementFail(error));
  }  
}
function* updateAdvertismentSaga() {
  yield takeEvery(UPDATE_ADVERTISEMENT, fetchOrders);
}

export default updateAdvertismentSaga;
