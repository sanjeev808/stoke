import { call, put, takeEvery } from "redux-saga/effects";

// Ecommerce Redux States
import {
    UPDATE_USER_NOTIFICATION,
} from "./actionTypes";
import {
    updateUserNotificationSuccess,
    updateUserNotificationFail
} from "./actions";

//Include Both Helper File with needed methods
import {
    getUpdateNotification,
} from "helpers/fakebackend_helper";


function* fetchOrders({payload:data}) {
 
  try {
    const response = yield call(getUpdateNotification,data);
    yield put(updateUserNotificationSuccess(response));
  } catch (error) {
    console.log(error,"getError" )
    yield put(updateUserNotificationFail(error));
  }  
}
function* updateUserNotificationSaga() {
  yield takeEvery(UPDATE_USER_NOTIFICATION, fetchOrders);
}

export default updateUserNotificationSaga;
