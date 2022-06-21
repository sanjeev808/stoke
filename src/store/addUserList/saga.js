import { call, put, takeEvery } from "redux-saga/effects";

// Ecommerce Redux States
import {
  ADD_USER,
} from "./actionTypes";
import {
 addUserSuccess,
 addUsersFail
} from "./actions";

//Include Both Helper File with needed methods
import {
  addUser,
} from "helpers/fakebackend_helper";


function* fetchOrders({ payload: users }) {

  try {
    const response = yield call(addUser,users);
    console.log("respone",response)
    yield put(addUserSuccess(response));
  } catch (error) {
    yield put(addUsersFail(error));
  }
}
function* addUserSaga() {
  yield takeEvery(ADD_USER, fetchOrders);
}

export default addUserSaga;
