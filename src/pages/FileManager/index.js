import React, { useEffect, useState } from "react";

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
import Select from "react-select";


import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { RiArrowUpDownFill } from "react-icons/ri";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import Form from "react-bootstrap/Form";
import Switch from "react-switch";
import { getusersNotification, updateUserNotification } from "store/actions";

// import {
//   selectAuth,
//   getNotificationsAsync,
//   notificationsList,
//   updateNotificationsAsync,
// } from "../../auth/authSlice";

  const Index = (props) => {
     const dispatch = useDispatch()
    
     const [adID, setAdID] = useState("");
    
    const notificationdata = useSelector(state=>state?.UserNotificationlist)
    console.log("get Notification user data", notificationdata) 
    
    const notificationUserData = notificationdata?.notificationUser
    const notificationAdminData = notificationdata?.notificationAdmin
    
     console.log("get Notification user data", notificationUserData) 
     console.log("get Notification admin data", notificationAdminData) 
    
    useEffect(()=>{
      dispatch(getusersNotification()); 
    },[dispatch])
    

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
      text: "Send Grid template",
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
    },
  ];
  const updateData = async (row) => {
    await dispatch(
      updateUserNotification({
        postData: {
          active: !(row?.active == 1) ? 1 : 0,
          notification_id: row?._id,
        },
        authToken,
      })
    );
    await dispatch(getusersNotification());
  };

  return (
    <div>
      <section className="main-dashboard position-relative">
        <div className="dashboard-right">
          <h2 className="dashboard-heading">Notifications</h2>

          <Row className="mt-3">
            <Col lg="12" md="12">
              <div className="userbox notification-box position-relative add-newuser">
                <h6 className="mb-3">
                  These email notifications are sent to all user types
                </h6>

                {/* <BootstrapTable
                  condensed
                  hover
                  keyField="id"
                  responsive={true}
                  bordered={true}
                  data={notificationsData?.data?.notificationAdmin || []}
                  columns={columns}
                /> */}

                {/* <h6 className="mt-5 mb-3">
                  These email notifications are sent to administrators only
                </h6> */}

                <BootstrapTable
                  condensed
                  hover
                  keyField="id"
                  responsive={true}
                  bordered={true}
                  data={notificationdata?.users?.notificationUser|| []}
                  columns={administratorsColumns}
                />
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
};

export default Index;










// import React, { useEffect ,useState} from "react"
// import { Card, CardBody, Container } from "reactstrap"
// import MetaTags from 'react-meta-tags';

// //Import Breadcrumb
// import Breadcrumbs from "../../components/Common/Breadcrumb"
// import { useDispatch, useSelector } from "react-redux";

// import { getusersNotification, updateUserNotification } from "store/actions";
// import BootstrapTable from "react-bootstrap-table-next";
// import Form from "react-bootstrap/Form";
// import Switch from "react-switch";
// // import updateUserNotification from "../../store/UpdateUserNotification/actions"

// import {
//   Button,
//   Dropdown,
//   Accordion,
//   Row,
//   Col,
//   Table,
//   Figure,
//   Check,
// } from "react-bootstrap";

// const Index = (props) => {
//  const dispatch = useDispatch()

//  const [adID, setAdID] = useState("");

// const notificationdata = useSelector(state=>state?.UserNotificationlist)
// console.log("get Notification user data", notificationdata) 

// const notificationUserData = notificationdata?.notificationUser
// const notificationAdminData = notificationdata?.notificationAdmin

//  console.log("get Notification user data", notificationUserData) 
//  console.log("get Notification admin data", notificationAdminData) 



//  const administratorsColumns = [
//   {
//     dataField: "",
//     text: "When",
//     sort: true,
//     formatter: (col, row) => {
//       return row?.statement;
//     },
//   },
//   {
//     dataField: "",
//     text: "Send this SendGrid template",
//     sort: true,
//     formatter: (col, row) => {
//       return (
//         <Form.Select aria-label="Default select example">
//           <option>{row?.options}</option>
//         </Form.Select>
//       );
//     },
//   },
//   {
//     dataField: "",
//     text: "Manage",
//     sort: false,
//     formatter: (col, row) => {
//       return (
//         <>
//           <Switch
//             checked={row?.active === 1}
//             uncheckedIcon={false}
//             checkedIcon={false}
//             onChange={() => updateData(row)}
//             onColor={"#14CE95"}
//             className="notify-pasword"
//           />
//         </>
//       );
//     },
//   }
//  ]
// //  useEffect(() => {
// //   let row = props;
// //   let rowData= row?.location?.state
// //   console.log("row",row?.location?.state)
// //       setAdID(rowData?._id);

// // }, []);

//  const updateNotification = {
//   ad_id: adID,
// };

//  const updateData = () => {
//   console.log("button clicked")
//    dispatch(updateUserNotification({
//     active: !(row?.active == 1) ? 1 : 0,
//     notification_id: row?.adID,
//    }
//    ))
// };
// useEffect(()=>{
//   dispatch(getusersNotification())
// },[])
//   return (
//     <React.Fragment>
//       <div className="page-content">
//           <MetaTags>
//             <title>Notification | Skote - React Admin & Dashboard Template</title>
//           </MetaTags>
//           <div className="dashboard-right">
//           <h2 className="dashboard-heading">Notifications</h2>
//            <Row className="mt-3">
//            <Col lg="12" md="12">
//            <div className="userbox notification-box position-relative add-newuser">
//                 <h6 className="mb-3">
//                   These email notifications are sent to all user types
//                 </h6>
//                 <BootstrapTable
//                   condensed
//                   hover
//                   keyField="id"
//                   responsive={true}
//                   bordered={true}
//                   data={notificationdata?.users?.notificationUser || []}
//                   columns={administratorsColumns}
//                 />
//               </div>
//               </Col>
//           </Row>
//           </div>
  
//       </div>
//     </React.Fragment>
//   )
// }
// export default Index