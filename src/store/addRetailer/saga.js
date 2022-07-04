import { call, put, takeEvery } from "redux-saga/effects";

// Ecommerce Redux States
import {
    ADD_RETAILER,
} from "./actionTypes";
import {
    addRetailerSuccess,
    addRetailerFail
} from "./actions";

//Include Both Helper File with needed methods
import {
  addRetailer,
} from "../../helpers/fakebackend_helper";


function* fetchOrders({ payload: users }) {

  try {
    const response = yield call(addRetailer,users);
    console.log("respone",response)
    yield put(addRetailerSuccess(response));
  } catch (error) {
    yield put(addRetailerFail(error));
  }
}
function* addRetailerSaga() {
  yield takeEvery(ADD_USER, fetchOrders);
}

export default addRetailerSaga;
