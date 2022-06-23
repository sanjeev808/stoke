import React, { useEffect } from "react"
import { Card, CardBody, Container } from "reactstrap"
import MetaTags from 'react-meta-tags';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { useDispatch, useSelector } from "react-redux";

import { getusersNotification } from "store/actions";
import BootstrapTable from "react-bootstrap-table-next";
import Form from "react-bootstrap/Form";
import Switch from "react-switch";

import {
  Button,
  Dropdown,
  Accordion,
  Row,
  Col,
  Table,
  Figure,
  Check,
} from "react-bootstrap";

const Index = () => {
 const dispatch = useDispatch()
const notificationdata = useSelector(state=>state?.UserNotificationlist)
console.log("get Notification user data", notificationdata) 

const notificationUserData = notificationdata?.notificationUser
const notificationAdminData = notificationdata?.notificationAdmin

 console.log("get Notification user data", notificationUserData) 
 console.log("get Notification admin data", notificationAdminData) 

 useEffect(()=>{
   dispatch(getusersNotification())
 },[])

 const administratorsColumns = [
  {
    dataField: "",
    text: "When",
    sort: true,
    formatter: (col, row) => {
      return row?.statement;
    },
  },
  {
    dataField: "",
    text: "Send this SendGrid template",
    sort: true,
    formatter: (col, row) => {
      return (
        <Form.Select aria-label="Default select example">
          <option>{row?.options}</option>
        </Form.Select>
      );
    },
  },
  {
    dataField: "",
    text: "Manage",
    sort: false,
    formatter: (col, row) => {
      return (
        <>
          <Switch
            checked={row?.active === 1}
            uncheckedIcon={false}
            checkedIcon={false}
            onChange={() => updateData(row)}
            onColor={"#14CE95"}
            className="notify-pasword"
          />
        </>
      );
    },
  }
 ]
 const updateData = async (row) => {
  await dispatch(
    updateNotificationsAsync({
      postData: {
        active: !(row?.active == 1) ? 1 : 0,
        notification_id: row?._id,
      },
      authToken,
    })
  );
  await dispatch(getNotificationsAsync({ authToken }));
};
  return (
    <React.Fragment>
      <div className="page-content">
          <MetaTags>
            <title>Notification | Skote - React Admin & Dashboard Template</title>
          </MetaTags>
          <div className="dashboard-right">
          <h2 className="dashboard-heading">Notifications</h2>
           <Row className="mt-3">
           <Col lg="12" md="12">
           <div className="userbox notification-box position-relative add-newuser">
                <h6 className="mb-3">
                  These email notifications are sent to all user types
                </h6>
                <BootstrapTable
                  condensed
                  hover
                  keyField="id"
                  responsive={true}
                  bordered={true}
                  data={notificationdata?.users?.notificationUser || []}
                  columns={administratorsColumns}
                />
              </div>
              </Col>
          </Row>
          </div>
  
      </div>
    </React.Fragment>
  )
}
export default Index