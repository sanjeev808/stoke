import { call, put, takeEvery } from "redux-saga/effects";

// Ecommerce Redux States
import {
    ADD_ADVERTISEMENT,
} from "./actionTypes";
import {
    addAdvertisementSuccess,
    addAdvertisementFail
} from "./actions";

//Include Both Helper File with needed methods
import {
  Addadvertisment,
} from "../../helpers/fakebackend_helper";


function* fetchOrders({ payload: users }) {

  try {
    const response = yield call(Addadvertisment,users);
    console.log("respone",response)
    yield put(addAdvertisementSuccess(response));
  } catch (error) {
    yield put(addAdvertisementFail(error));
  }
}
function* addAdvertisementSaga() {
  yield takeEvery(ADD_ADVERTISEMENT, fetchOrders);
}

export default addAdvertisementSaga;
