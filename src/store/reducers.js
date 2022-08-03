import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"

//E-commerce
import ecommerce from "./e-commerce/reducer"

//Calendar
import calendar from "./calendar/reducer"

//chat
import chat from "./chat/reducer"

//crypto
import crypto from "./crypto/reducer"

//invoices
import invoices from "./invoices/reducer"

//projects
import projects from "./projects/reducer"

//tasks
import tasks from "./tasks/reducer"

//contacts
import contacts from "./contacts/reducer"

//mails
import mails from "./mails/reducer";

//Dashboard 
import Dashboard from "./dashboard/reducer";

//Dasboard saas
import DashboardSaas from "./dashboard-saas/reducer";

// latest user 
import latestUserList from "./latestUser/reducer"

// user list  
import Userlist from "./userlist/reducer"

// add user 
import addUserList from './addUserList/reducer'

// edit user
import editUser from './EditUser/reducer'

//update user notification
import updateUserNotification from './UpdateUserNotification/reducer'

// retailer user
import RetailerList from './Retailers/reducer'

// add retailer
import addRetailer from "./Retailers/reducer"

// edit retailer
import editretailer from "./editRetailer/reducer"

// serach retailer 
import searchRetailer from "./searchRetailer/reducer"
// retailer user
import UserNotificationlist from './Notification/reducer'

//addvertisment
import  getAdvertisement from './Addvertisment/reducer'

// add advertisment
import  addAdvertisement from './addAdvertisemnet/reducer'

// update advertisement
import updateAdvertisement from "./updateAdvertisement/reducer"

//advertisment status
import AdvertisementStatus from "./advertisementStatus/reducer"

// get support 
import SupportList from './support/reducer'

const rootReducer = combineReducers({
  // public
  Layout,
  login,
  Account,
  ForgetPassword,
  Profile,
  ecommerce,
  calendar,
  chat,
  mails,
  crypto,
  invoices,
  projects,
  tasks,
  contacts,
  Dashboard,
  DashboardSaas,
  latestUserList,
  Userlist,
  addUserList,
  editUser,
  updateUserNotification,
  RetailerList,
  addRetailer,
  editretailer,
  searchRetailer,
  UserNotificationlist,
  getAdvertisement,
  addAdvertisement,
  updateAdvertisement,
  AdvertisementStatus,
  SupportList

})

export default rootReducer
