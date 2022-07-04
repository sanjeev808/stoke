import { call, put, takeEvery } from "redux-saga/effects";

// Ecommerce Redux States
import {
    EDIT_RETAILER,
} from "./actionTypes";
import {
    editretailerSuccess,
    editretailerFail
} from "./actions";

//Include Both Helper File with needed methods
import {
    EditRetailer,
} from "../../helpers/fakebackend_helper";


function* fetchOrders({ payload: users }) {

  try {
    const response = yield call(EditRetailer,users);
    console.log("respone",response)
    yield put(editretailerSuccess(response));
  } catch (error) {
    yield put(editretailerFail(error));
  }
}
function* editRetailerSaga() {
  yield takeEvery(EDIT_RETAILER, fetchOrders);
}

export default editRetailerSaga;
