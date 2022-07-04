import { call, put, takeEvery } from "redux-saga/effects";

// Ecommerce Redux States
import {
  EDIT_USER,
} from "./actionTypes";
import {
 editUserSuccess,
 editUsersFail
} from "./actions";

//Include Both Helper File with needed methods
import {
    EditUser,
} from "../../helpers/fakebackend_helper";


function* fetchOrders({ payload: users }) {

  try {
    const response = yield call(EditUser,users);
    console.log("respone",response)
    yield put(editUserSuccess(response));
  } catch (error) {
    yield put(editUsersFail(error));
  }
}
function* editUserSaga() {
  yield takeEvery(EDIT_USER, fetchOrders);
}

export default editUserSaga;
