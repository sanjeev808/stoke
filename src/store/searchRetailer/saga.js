import { call, put, takeEvery } from "redux-saga/effects";

// Ecommerce Redux States
import {
    SEARCH_RETAILER,
} from "./actionTypes";
import {
    searchretailerSuccess,
    searchretailersFail
} from "./actions";

//Include Both Helper File with needed methods
import {
  SearchRetailer,
} from "helpers/fakebackend_helper";


function* fetchOrders({payload:data}) {
 
  try {
    const response = yield call(SearchRetailer,data);
    yield put(searchretailerSuccess(response));
  } catch (error) {
    console.log(error,"getError" )
    yield put(searchretailersFail(error));
  }  
}
function* searchretailerSaga() {
  yield takeEvery(SEARCH_RETAILER, fetchOrders);
}

export default searchretailerSaga;
