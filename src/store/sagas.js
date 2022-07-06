import { all, fork } from "redux-saga/effects"

//public
import AccountSaga from "./auth/register/saga"
import AuthSaga from "./auth/login/saga"
import ForgetSaga from "./auth/forgetpwd/saga"
import ProfileSaga from "./auth/profile/saga"
import LayoutSaga from "./layout/saga"
import ecommerceSaga from "./e-commerce/saga"
import calendarSaga from "./calendar/saga"
import chatSaga from "./chat/saga"
import cryptoSaga from "./crypto/saga"
import invoiceSaga from "./invoices/saga"
import projectsSaga from "./projects/saga"
import tasksSaga from "./tasks/saga"
import mailsSaga from "./mails/saga"
import contactsSaga from "./contacts/saga";
import dashboardSaga from "./dashboard/saga";
import dashboardSaasSaga from "./dashboard-saas/saga";
import LatestUserSaga from "./latestUser/saga"
import userSaga from "./userlist/saga"
import addUserSaga from "./addUserList/saga"
import editUserSaga from "./EditUser/saga"
import updateUserNotificationSaga from "./UpdateUserNotification/saga"
import retaileruserSaga from './Retailers/saga'
import addRetailerSaga from './Retailers/saga'
import searchretailerSaga from "./searchRetailer/saga"
// import editRetailerSaga from "./EditRetailer/saga"
import userNotificationSaga from './Notification/saga'
import advertismentSaga from "./Addvertisment/saga"
import addAdvertisementSaga from "./addAdvertisemnet/saga"
import updateAdvertismentSaga from "./updateAdvertisement/saga"
import AdvertisementStatusSaga from "./advertisementStatus/saga"
import supportSaga from "./support/saga"
export default function* rootSaga() {
  yield all([
    //public
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(LayoutSaga),
    fork(ecommerceSaga),
    fork(calendarSaga),
    fork(chatSaga),
    fork(mailsSaga),
    fork(cryptoSaga),
    fork(invoiceSaga),
    fork(projectsSaga),
    fork(tasksSaga),
    fork(contactsSaga),
    fork(dashboardSaga),
    fork(dashboardSaasSaga),
    fork(LatestUserSaga),
    fork(userSaga),
    fork(addUserSaga),
    fork(editUserSaga),
    fork(updateUserNotificationSaga),
    fork(retaileruserSaga),
    fork(searchretailerSaga),
    // forK(editRetailerSaga),
    fork(userNotificationSaga),
    fork(addRetailerSaga),
    fork(advertismentSaga),
    fork(addAdvertisementSaga),
    fork(updateAdvertismentSaga),
    fork(AdvertisementStatusSaga),
    fork(supportSaga)
  ])
}
