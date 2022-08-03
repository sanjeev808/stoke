import React, { useEffect } from "react";
import { useState } from "react";

import {
  Form,
  Button,
  Dropdown,
  Accordion,
  Row,
  Col,
  Table,
  Figure,
  Modal,
} from "react-bootstrap";
import Select from "react-select";

import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { editusers } from "store/actions"
import { getusers } from "store/actions"
import avtar from "../../assets/images/users/avtar.png"
// import {
//   selectAuth,
//   updateUsersAsync,
//   getUserListAsync,
//   logout,
// } from "../../auth/authSlice";

const EditUsers = (props) => {
  const auth = JSON.parse(localStorage.getItem('authUser'));
  const authToken = auth?.data?.token
  const dispatch = useDispatch();
  let history = useHistory();
  const [userName, setUserName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userphone, setUserPhone] = useState("");
  const [userImage, setUserImage] = useState("");
  const [userID, setUserID] = useState("");
  const [pageNumber, setPage] = useState(1);
  const [password, setPassword] = useState("");
  const [userPasswordModal, setUserPasswordModal] = useState(false);

  const [selectedTypeOption, SetSelectedTypeOption] = useState("");
  const [selectedOption, SetSelectedOption] = useState("");
  const hiddenFileInput = React.useRef(null);

  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [formState, setFormState] = useState({
    errors: {},
  });
  const userTypeOptions = [
    { value: 1, label: "Admin" },
    { value: 2, label: "User" },
  ];

  const sOptions = [
    { value: 0, label: "Suspended" },
    { value: 1, label: "Active" },
    { value: 2, label: "Archived" },
  ];

  useEffect(() => {
    let rowData = props
    let row = rowData?.location?.state
    console.log("row data",row)
    // const socket = io("https://stgn.appsndevs.com", {
    //   path: "/snapcident/socket.io",
    //   query: {
    //     user_id: row?._id,
    //   },
    // });
    // console.log("socket", socket);
 
    if (rowData?.location?.state) {
      setUserID(row?._id);
      setUserName(row?.firstname);
      setLastName(row?.lastname);
      setUserEmail(row?.email);
      setUserPhone(row?.phone_number);
      setUserImage(row.profile_image);
      SetSelectedOption(
        sOptions.filter((i) => (i.value === row?.active) == 1)[0] || ""
      );
      SetSelectedTypeOption(
        userTypeOptions.filter((i) => (i.value === row?.role_id) == 1)[0] || ""
      );
    }
  }, []);

  const handleChange = async (e) => {
    SetSelectedOption(e);
  };

  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;
    // if (userName.match(/[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]/)) {
    if (!userName.match(/^[A-Za-z]*$/)) {
      formIsValid = false;
      errors["userName"] =
        "FirstName cannot contain numbers special characters and Spaces";
    }
    if (!userName) {
      formIsValid = false;
      errors["userName"] = "FirstName cannot be empty";
    }
    if (!lastName.match(/^[A-Za-z]*$/)) {
      formIsValid = false;
      errors["lastName"] =
        "lastName cannot contain numbers special characters and Spaces";
    }
    if (!lastName) {
      formIsValid = false;
      errors["lastName"] = "lastName cannot be empty";
    }

    if (!userEmail) {
      formIsValid = false;
      errors["userEmail"] = "Please enter Email";
    }

    if (!userphone.match(/^[0-9]*$/)) {
      formIsValid = false;
      errors["userphone"] = "Only Numbers allowed";
    }

    if (!userphone) {
      formIsValid = false;
      errors["userphone"] = "Please enter Phone Number";
    }
    if (userphone.length < 10) {
      formIsValid = false;
      errors["userphone"] = "Phone number should be 10 digit number.";
    }
    setFormState({ errors: errors });
    return formIsValid;
  };
  const addUserData = {
        user_id: userID,
        email: userEmail,
        phone_number: userphone,
        firstname: userName,
        lastname: lastName,
        active: selectedOption.value,
        role_id:selectedTypeOption.value,
        profile_image: imgData,
        status:true
      };
  const updateUserData = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      await dispatch(editusers(addUserData,authToken,history));
      await dispatch(getusers({ pageNumber, authToken }));
      history.push("/user")
    }
  };

  const passwordValidation = () => {
    let errors = {};
    let formIsValid = true;
    if (!lastName) {
      formIsValid = false;
      toast.error("LastName cannot be empty");
    }
    if (!userName) {
      formIsValid = false;
      toast.error("FirstName cannot be empty");
    }
    if (!userphone) {
      formIsValid = false;
      toast.error("Please enter Phone Number");
    }
    if (!userEmail) {
      formIsValid = false;
      toast.error("Please enter Email");
    }
    if (password.length < 8) {
      formIsValid = false;
      errors["password"] = "Enter Passowrd requires minimum 8 characters.";
    }

    if (
      !password.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/
      )
    ) {
      formIsValid = false;
      errors["password"] =
        "Password requires minimum 8 characters contain one special character, one number and one letter";
    }
    setFormState({ errors: errors });
    return formIsValid;
  };
  const handleCancel = () => {
    history.push("/user");
  };

  // const updateUserPasData = async (e) => {
  //   e.preventDefault();
  //   if (passwordValidation()) {
  //     await dispatch(
  //       editusers({
  //         postData: {
  //           firstname: userName,
  //           user_id: userID,
  //           active: selectedOption.value,
  //           lastname: lastName,
  //           email: userEmail,
  //           phone_number: userphone,
  //           role_id: selectedTypeOption.value,
  //           profile_image: imgData || userImage,
  //           password: password,
  //         },
  //         authToken,
  //         history,
  //       })
  //     );
  //     await dispatch(getusers({ pageNumber, authToken }));
  //   }
  // };
  const handleTypeStatus = async (e) => {
    SetSelectedTypeOption(e);
  };

  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      if (
        e.target.files[0].type === "image/jpeg" ||
        e.target.files[0].type === "image/png" ||
        e.target.files[0].type === "image/jpg"
      ) {
        if (e.target.files[0].size <= 1000000) {
          reader.addEventListener("load", () => {
            setImgData(reader.result);
          });
        } else {
          toast.error("File size should be less than 1 MB.");
        }
      } else {
        toast.error("file not supported");
      }

      reader.readAsDataURL(e.target.files[0]);
    }
    //   reader.addEventListener("load", () => {
    //     setImgData(reader.result);
    //   });
    //   reader.readAsDataURL(e.target.files[0]);
    // }
  };

  const handleClick = () => {
    if (hiddenFileInput) {
      hiddenFileInput.current.click();
    }
  };

  const resetUserPasswordBtn = () => {
    // setUserID()
    setUserPasswordModal(userPasswordModal ? false : true);
  };

  return (
    <div>
      <section className="main-dashboard position-relative">
        <div className="dashboard-right"  style={{ marginTop: 74, marginLeft: 15 }}>
          <h2 className="dashboard-heading">Edit User Details</h2>
          <Row className="active-userbox mt-2 ms-1">
            <Col lg="3" md="12">
              <Form.Group className="mb-1">
                <Form.Label>User Status</Form.Label>
                <Select
                  value={selectedOption}
                  onChange={handleChange}
                  options={sOptions}
                />
              </Form.Group>
            </Col>
            <Col lg="3" md="12">
              <Form.Group className="mb-1">
                <Form.Label>User Type</Form.Label>
                <Select
                  value={selectedTypeOption}
                  onChange={handleTypeStatus}
                  options={userTypeOptions}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col lg="10" md="12">
              <div className="user-detailbox w-100">
                <Row>
                  <Col lg="8" md="12">
                    <Row>
                      <Col lg="6" md="12">
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicEmail4"
                        >
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            maxLength={15}
                            placeholder="Enter Firstname"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                          />
                          <span className="error-msg" style={{ color: "red" }}>
                            {formState?.errors["userName"]}
                          </span>
                        </Form.Group>
                      </Col>
                      <Col lg="6" md="12">
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicEmail5"
                        >
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                          />
                          <span className="error-msg" style={{ color: "red" }}>
                            {formState?.errors["userEmail"]}
                          </span>
                        </Form.Group>
                      </Col>
                      <Col lg="6" md="12">
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicEmail6"
                        >
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            maxLength={15}
                            placeholder="Enter Lastname"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                          <span className="error-msg" style={{ color: "red" }}>
                            {formState?.errors["lastName"]}
                          </span>
                        </Form.Group>
                      </Col>
                      <Col lg="6" md="12">
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicEmail7"
                        >
                          <Form.Label>Phone Number:</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter PhoneNumber"
                            maxLength={10}
                            value={userphone}
                            onChange={(e) => setUserPhone(e.target.value)}
                          />
                          <span className="error-msg" style={{ color: "red" }}>
                            {formState?.errors["userphone"]}
                          </span>
                        </Form.Group>
                      </Col>
                      <Col lg="6" md="12" className="mt-3"></Col>
                      <Col lg="6" md="12" className="mt-3">
                        <Form.Label className="d-block">Password</Form.Label>
                        <Button
                          className="brown-btn d-block text-end gray-btn"
                          onClick={() => resetUserPasswordBtn()}
                        >
                          Reset User Password
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg="4">
                    <div className="my-3 user-picsec d-flex flex-column align-items-center">
                      <div className="position-relative userimg-editicon">
                        <img
                          src={imgData || userImage || avtar}
                          className="img-fluid rounded-circle"  width={170} height={170}
                          alt=""
                        />
                        <span className=""> <FaRegEdit onClick={handleClick} /></span>
                        <input
                          id="profilePic"
                          className="profile-secpic"
                          type="file"
                          ref={hiddenFileInput}
                          style={{ display: "none" }}
                          onChange={onChangePicture}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="savechanges-btn d-flex">
                  <Button className="brown-btn me-3" onClick={updateUserData}>
                    Save Changes
                  </Button>
                  <Button
                    className="brown-btn d-block gray-btn"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
          {/* <Modal
            show={userPasswordModal}
            onHide={resetUserPasswordBtn}
            size="md"
          >
            <Modal.Header closeButton>
              <Modal.Title>User Password </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {" "}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Row>
                  <Col lg="8" className="mt-3">
                    <Form.Label>Enter New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="error-msg" style={{ color: "red" }}>
                      {formState?.errors["password"]}
                    </span>
                  </Col>
                </Row>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={resetUserPasswordBtn}>
                Close
              </Button>
              <Button className="brown-btn me-3" onClick={updateUserPasData}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal> */}
        </div>
      </section>
    </div>
  );
};

export default EditUsers;










// import React, { useEffect, useState } from "react"
// import PropTypes from "prop-types"
// import { withRouter, Link, Redirect, useHistory } from "react-router-dom"

// import { Button, Card, CardBody, Col, Row, Badge } from "reactstrap"
// //redux
// import { useSelector, useDispatch } from "react-redux"
// import { editusers } from "store/actions"
// // add
// import { Form,Figure } from "react-bootstrap"
// import { imgData } from "../../assets/images/users/avatar-1.jpg"
// import { addUser } from "helpers/fakebackend_helper"
// import { FaRegEdit } from "react-icons/fa";
// import Select from "react-select";
// const EditUser = props => {
//   const [userID, setUserID] = useState("");
//   const [emailAddress, setEmailAddress] = useState("");
//   const [firstname, setFirstName] = useState("");
//   const [lastname, setLastName] = useState("");
//   const [password, setPassword] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [selectedOption, SetSelectedOption] = useState("");
//   const [selectedTypeOption, SetSelectedTypeOption] = useState("");
//   const [selectedStatusOption, SetSelectedStatusOption] = useState("");
//   const [userPasswordModal, setUserPasswordModal] = useState(false);
//   const hiddenFileInput = React.useRef(null);
//   const [picture, setPicture] = useState(null);
//   const [imgData, setImgData] = useState(null);
//   const [formState, setFormState] = useState({
//     errors: {},
//   });
// const history = useHistory()
// // selector and dispatch data 
// // const authToken = useSelector(state => state?.addUserList);
// // console.log("data found" ,authToken)
// const dispatch = useDispatch();

// const userTypeOptions = [
//   { value: 1, label: "Admin" },
//   { value: 2, label: "User" },
// ];

// const sOptions = [
//   { value: 0, label: "Suspended" },
//   { value: 1, label: "Active" },
//   { value: 2, label: "Archived" },
// ];
// useEffect(()=>{
//   let row = props
//   let rowdata = row?.location?.state
//   console.log("rowdata",rowdata)
//   setUserID(rowdata._id)
//   setFirstName(rowdata.firstname)
//   setEmailAddress(rowdata.email)
//   setPhoneNumber(rowdata.phone_number)
//   setLastName(rowdata.lastname)
//   setImgData(rowdata.profile_image)
//   SetSelectedOption(
//     sOptions.filter((i) => (i.value === row?.active) == 1)[0] || ""
//   );
//   SetSelectedTypeOption(
//     userTypeOptions.filter((i) => (i.value === row?.active) == 1)[0] || ""
//   );

// },[])
// console.log("selectedTypeOption",selectedOption.value)
//   const addUserData = {
//     user_id: userID,
//     email: emailAddress,
//     phone_number: phoneNumber,
//     firstname: firstname,
//     lastname: lastname,
//     active: selectedOption.value,
//     role_id:selectedTypeOption.value,
//     profile_image: imgData,
//     status:true
//   };
  
//   console.log("all user data ",addUserData)

//   const handleValidation = () => {
//     let errors = {};
//     let formIsValid = true;
//     const phoneregex = /^[0-9\b]+$/;
//     const numberregex = /^[a-zA-Z'-'s]{1,40}$/i;
//     const emailRegex = /\S+@\S+\.\S+/;
//     const specialCharacterregex = /[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]/;

//     if (!firstname) {
//       formIsValid = false;
//       errors["firstname"] = "firstname cannot be empty";
//     }
//     else if (firstname.length < 3 || firstname.length > 10) {
//       errors["firstname"] = "First Name lass then 7 Character"
//     }
//     else if (!numberregex.test(firstname)) {
//       errors["firstname"] = "values is always character"
//     }
//     if (lastname.match(/[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]/)) {
//       formIsValid = false;
//       errors["lastname"] = "firstname cannot contain a special characters";
//     }
//     if (!lastname) {
//       formIsValid = false;
//       errors["lastname"] = "lastname cannot be empty";
//     }
//     else if (lastname.length < 3 || lastname.length > 10) {
//       errors["lastname"] = "First Name lass then 7 Character"
//     }
//     else if (!numberregex.test(lastname)) {
//       errors["lastname"] = "values is always character"
//     }
//     if (!emailAddress) {
//       formIsValid = false;
//       errors["emailAddress"] = "Please enter Email";
//     }
//     if (!emailRegex.test(emailAddress)) {
//       errors["emailAddress"] = "please enter ur valid email"
//     }
//     if (!phoneNumber) {
//       formIsValid = false;
//       errors["phoneNumber"] = "Please enter Phone Number";
//     }
//     else if (phoneNumber.length >= 11 || phoneNumber.length < 10) {
//       errors["phoneNumber"] = "phone is equal to 10"
//     }
//     else if (!phoneregex.test(phoneNumber)) {
//       errors["phoneNumber"] = "only number required"
//     }
//     // else if (!specialCharacterregex.test(phoneNumber)) {
//     //   errors["phoneNumber"] = "can't Write special character required"
//     // }
//     //Changes end 
//     setFormState({ errors: errors });
//     return formIsValid;
//   };


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (handleValidation()) {
//      dispatch(editusers(addUserData));
//      history.push("/user")
//     }
//   };
//   const resetUserPasswordBtn = () => {
//     setUserPasswordModal(userPasswordModal ? false : true);
//   };

//   const handleTypeStatus = async (e) => {
//     e.preventDefault()
//     console.log(e.target.value);
//     SetSelectedTypeOption(e.target.value);
//   };

//   const handleStatusChange =  (e) => {
//     console.log("value clicked ", e.target.index)
//     SetSelectedStatusOption(e.target.value)
//     // const  activeData=e.target.value;
//     // console.log("jkhf",activeData)
//     // SetSelectedStatusOption((res) =>{
//     //   return  res=activeData;
//     // })
//     // console.log( "data get",SetSelectedStatusOption())
//   };
//   const onChangePicture = (e) => {
//     if (e.target.files[0]) {
//       console.log(e.target.files[0])
//       setPicture(e.target.files[0]);
//       const reader = new FileReader();
//       reader.addEventListener("load", () => {
//         setImgData(reader.result);
//       });
//       reader.readAsDataURL(e.target.files[0]);
//     }
//   };
//   const handleClick = () => {
//     if (hiddenFileInput) {
//       hiddenFileInput.current.click();
//     }
//   };
//   const handleChange = async (e) => {
//     SetSelectedOption(e);
//   };
//   return (
//     <React.Fragment>


//       <div>
//         <section className="main-dashboard position-relative">
//           <div className="dashboard-right" style={{ marginTop: 74, marginLeft: 15 }}>
//             <h2 className="dashboard-heading ">Edit User Details</h2>
//             <Row className="active-userbox mt-4 ms-1">
//               {/* <Col xs lg="2" md="12">
//                 <Form.Group className="mb-1">
//                   <Form.Label>User status</Form.Label>
//                   {/* <Form.Select id="#">
//                     <option>Active</option>
//                     <option>Inactive</option>
//                   </Form.Select> s
//                 </Form.Group>
//               </Col> */}
//               <Col lg="3" md="12">
//               <Form.Group className="mb-1">
//                 <Form.Label>User Status</Form.Label>
//                 <Select
//                   value={selectedOption}
//                   onChange={handleChange}
//                   options={sOptions}
//                 />
//               </Form.Group>
//               </Col>
//               <Col lg="3" md="12">
//               {/* <Form.Group className="mb-1">
//                 <Form.Label>User Type</Form.Label>
//                 <Select
//                   value={selectedTypeOption}
//                   onChange={handleTypeStatus}
//                   options={userTypeOptions}
//                 />
//               </Form.Group> */}
//               {/* <Form.Group className="mb-1">
//                 <Form.Label>User Type</Form.Label>
//                 <Select
//                   value={selectedTypeOption}
//                   onChange={handleTypeStatus}
//                   options={userTypeOptions}
//                 />
//               </Form.Group> */}
//               </Col>
//             </Row>
//             <Row>
//               <Col lg="10" md="12">
//                 <div className="user-detailbox w-100">
//                   <Row>
//                     <Col lg="8" md="12">
//                       <Row>
//                         <Col lg="6" md="12">
//                           <Form.Group className="mb-3" controlId="formBasicEmail">
//                             <Form.Label>First Name</Form.Label>
//                             <Form.Control
//                               type="text"
//                               maxLength={15}
//                               placeholder="Enter username"
//                               value={firstname}
//                               onChange={(e) => setFirstName(e.target.value)}
//                             />
//                             <span className="error-msg" style={{ color: "red" }}>
//                               {formState?.errors["firstname"]}
//                             </span>
//                           </Form.Group>
//                         </Col>
//                         <Col lg="6" md="12">
//                           <Form.Group className="mb-3" controlId="formBasicEmail">
//                             <Form.Label>Email Address</Form.Label>
//                             <Form.Control
//                               type="text"
//                               placeholder="Enter email"
//                               value={emailAddress}
//                               onChange={(e) => setEmailAddress(e.target.value)}
//                             />
//                             <span className="error-msg" style={{ color: "red" }}>
//                               {formState?.errors["emailAddress"]}
//                             </span>
//                           </Form.Group>
//                         </Col>
//                         <Col lg="6" md="12">
//                           <Form.Group className="mb-3" controlId="formBasicEmail">
//                             <Form.Label>Last Name</Form.Label>
//                             <Form.Control
//                               type="text"
//                               maxLength={15}
//                               placeholder="Enter username"
//                               value={lastname}
//                               onChange={(e) => setLastName(e.target.value)}
//                             />
//                             <span className="error-msg" style={{ color: "red" }}>
//                               {formState?.errors["lastname"]}
//                             </span>
//                           </Form.Group>
//                         </Col>
//                         <Col lg="6" md="12">
//                           <Form.Group className="mb-3" controlId="formBasicEmail">
//                             <Form.Label>Phone Number:</Form.Label>
//                             <Form.Control
//                               type="text"
//                               placeholder="Enter phone"
//                               value={phoneNumber}
//                               onChange={(e) => setPhoneNumber(e.target.value)}
//                             />
//                             <span className="error-msg" style={{ color: "red" }}>
//                               {formState?.errors["phoneNumber"]}
//                             </span>
//                           </Form.Group>
//                         </Col>
//                         <Col lg="6" md="12" className="mt-3"></Col>
//                       <Col lg="6" md="12" className="mt-3">
//                         <Form.Label className="d-block">Password</Form.Label>
//                         <Button className="brown-btn d-block text-end gray-btn"
//                         //  onClick={() => resetUserPasswordBtn()}
//                           >
//                           Reset User Password
//                         </Button>
//                       </Col>
//                       </Row>
//                     </Col>
//                     <Col lg="4" md="12">
//                     <div>
//                       <span className="single-userimg">
//                         <span className="profile-imguser d-flex flex-column align-items-center">
//                           <div className="position-relative userimg-editicon">
//                             <img
//                               src={imgData}
//                               className="w-75 singleuserimage  rounded-circle"
//                               alt=""
//                             />
//                             <a>
//                               <FaRegEdit onClick={handleClick} />{" "}
//                             </a>
//                             <input
//                               id="profilePic"
//                               type="file"
//                               ref={hiddenFileInput}
//                               style={{ display: "none" }}
//                               onChange={onChangePicture}
//                             />
//                           </div>
//                         </span>
//                         {/* <Figure>
//                           <FaRegEdit />
//                         </Figure> */}
//                       </span>
//                     </div>
//                   </Col>
//                   </Row>
//                   <div className="savechanges-btn d-flex">
//                     <Button className="brown-btn me-3"
//                       onClick={handleSubmit}
//                     >
//                       Save Changes
//                     </Button>
//                     <Button className="brown-btn d-block gray-btn">Cancel</Button>
//                   </div>
//                 </div>
//               </Col>
//             </Row>
//           </div>
//         </section>
//       </div>
//     </React.Fragment>
//   )
// }

// EditUser.propTypes = {
//   orders: PropTypes.array,
//   onGetOrders: PropTypes.func,
// }

// export default withRouter(EditUser)
