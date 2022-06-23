import { call, put, takeEvery } from "redux-saga/effects";

// Ecommerce Redux States
import {
    GET_USER_NOTIFICATION,
} from "./actionTypes";
import {
    getusersNotificationSuccess,
    getusersNotificationFail
} from "./actions";

//Include Both Helper File with needed methods
import {
    getusersNotification,
} from "../../helpers/fakebackend_helper";


function* fetchOrders() {
 
  try {
    const response = yield call(getusersNotification);
    yield put(getusersNotificationSuccess(response));
  } catch (error) {
    console.log(error,"getError" )
    yield put(getusersNotificationFail(error));
  }
}
function* userNotificationSaga() {
  yield takeEvery(GET_USER_NOTIFICATION, fetchOrders);
}

export default userNotificationSaga;
