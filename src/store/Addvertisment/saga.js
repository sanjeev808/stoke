import { call, put, takeEvery } from "redux-saga/effects";

// Ecommerce Redux States
import {
GET_ADVERTISMENT
} from "./actionTypes";
import {
  getadvertismentSuccess,
  getadvertismentFail
} from "./actions";

//Include Both Helper File with needed methods
import {
  getAdvertisement,
} from "helpers/fakebackend_helper";


function* fetchOrders({payload:data}) {
 
  try {
    const response = yield call(getAdvertisement,data);
    console.log("get reposnse data", response);
    yield put(getadvertismentSuccess(response));
  } catch (error) {
    console.log(error,"getError" )
    yield put(getadvertismentFail(error));
  }  
}
function* advertismentSaga() {
  yield takeEvery(GET_ADVERTISMENT, fetchOrders);
}

export default advertismentSaga;
