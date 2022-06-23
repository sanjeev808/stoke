
import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { withRouter, Link, Redirect } from "react-router-dom"

import { Button, Card, CardBody, Col, Row, Badge } from "reactstrap"
//redux
import { useSelector, useDispatch } from "react-redux"
import { addusers } from "store/actions"
// add
import { Form,Figure } from "react-bootstrap"
import { imgData } from "../../assets/images/users/avatar-1.jpg"
import { addUser } from "helpers/fakebackend_helper"
import { FaRegEdit } from "react-icons/fa";

const AddUser = props => {

  const [emailAddress, setEmailAddress] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedTypeOption, SetSelectedTypeOption] = useState("");
  const [selectedStatusOption, SetSelectedStatusOption] = useState("");
  const [userPasswordModal, setUserPasswordModal] = useState(false);
  const hiddenFileInput = React.useRef(null);
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [formState, setFormState] = useState({
    errors: {},
  });

// selector and dispatch data 
// const authToken = useSelector(state => state?.addUserList);
// console.log("data found" ,authToken)
const dispatch = useDispatch();

  const userTypeOptions = [
    { value: 1, label: "Admin" },
    { value: 2, label: "User" },
  ];

  const userStatusOptions = [
    { value: 0, label: "Suspended" },
    { value: 1, label: "Active" },
    { value: 2, label: "Archived" },
  ];

  const addUserData = {
    email: emailAddress,
    phone_number: phoneNumber,
    firstname: firstname,
    lastname: lastname,
    // role_id: selectedTypeOption,
    role_id:"1",
    profile_image: imgData,
    // active: selectedStatusOption,
    active:"2",

    status:true
    // "password": password
  };
  console.log("all user data ",addUserData)
  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;
    const phoneregex = /^[0-9\b]+$/;
    const numberregex = /^[a-zA-Z'-'s]{1,40}$/i;
    const emailRegex = /\S+@\S+\.\S+/;
    const specialCharacterregex = /[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]/;
    // if (password.length < 8) {
    //   formIsValid = false;
    //   errors["password"] = "Password should be of 8 digit";
    // }
    // if (
    //   !password.match(
    //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/
    //   )
    // ) {
    //   formIsValid = false;
    //   errors["password"] =
    //     "Password should contain one special character, one number and one letter";
    // }


    //first name validations

    if (!firstname) {
      formIsValid = false;
      errors["firstname"] = "firstname cannot be empty";
    }
    // changes start
    else if (firstname.length < 3 || firstname.length > 10) {
      errors["firstname"] = "First Name lass then 7 Character"
    }
    else if (!numberregex.test(firstname)) {
      errors["firstname"] = "values is always character"
    }
    //changes end

    //last name validations
    if (lastname.match(/[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]/)) {
      formIsValid = false;
      errors["lastname"] = "firstname cannot contain a special characters";
    }
    if (!lastname) {
      formIsValid = false;
      errors["lastname"] = "lastname cannot be empty";
    }

    // changes start
    else if (lastname.length < 3 || lastname.length > 10) {
      errors["lastname"] = "First Name lass then 7 Character"
    }
    else if (!numberregex.test(lastname)) {
      errors["lastname"] = "values is always character"
    }
    //changes end

    // if (!password) {
    //   formIsValid = false;
    //   errors["password"] = "Please enter Password";
    // }

    // email validation

    if (!emailAddress) {
      formIsValid = false;
      errors["emailAddress"] = "Please enter Email";
    }

    //changes start
    if (!emailRegex.test(emailAddress)) {
      errors["emailAddress"] = "please enter ur valid email"
    }
    //changes end 

    if (!phoneNumber) {
      formIsValid = false;
      errors["phoneNumber"] = "Please enter Phone Number";
    }

    //changes Start
    else if (phoneNumber.length >= 11 || phoneNumber.length < 10) {
      errors["phoneNumber"] = "phone is equal to 10"
    }
    else if (!phoneregex.test(phoneNumber)) {
      errors["phoneNumber"] = "only number required"
    }
    // else if (!specialCharacterregex.test(phoneNumber)) {
    //   errors["phoneNumber"] = "can't Write special character required"
    // }
    //Changes end 
    setFormState({ errors: errors });
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
     dispatch(addusers(addUserData));
     Redirect("/user")
    }
  };

  const resetUserPasswordBtn = () => {
    setUserPasswordModal(userPasswordModal ? false : true);
  };

  const handleTypeStatus = async (e) => {
    console.log(e.target.value);
    SetSelectedTypeOption(e.target.value);
  };

  const handleStatusChange =  (e) => {
    console.log("value clicked ", e.target.index)
    SetSelectedStatusOption(e.target.value)
    // const  activeData=e.target.value;
    // console.log("jkhf",activeData)
    // SetSelectedStatusOption((res) =>{
    //   return  res=activeData;
    // })
    // console.log( "data get",SetSelectedStatusOption())
  };
  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      console.log(e.target.files[0])
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handleClick = () => {
    if (hiddenFileInput) {
      hiddenFileInput.current.click();
    }
  };

  return (
    <React.Fragment>


      <div>
        <section className="main-dashboard position-relative">
          <div className="dashboard-right" style={{ marginTop: 74, marginLeft: 15 }}>
            <h2 className="dashboard-heading ">Add User Details</h2>
            <Row className="active-userbox mt-4 ms-1">
              {/* <Col xs lg="2" md="12">
                <Form.Group className="mb-1">
                  <Form.Label>User status</Form.Label>
                  {/* <Form.Select id="#">
                    <option>Active</option>
                    <option>Inactive</option>
                  </Form.Select> s
                </Form.Group>
              </Col> */}
              <Col lg="3" md="12">
                <Form.Group className="mb-1">
                  <Form.Label>User Status</Form.Label>
                  <Form.Select
                  value={selectedStatusOption}
                  onChange={handleStatusChange} >
                  {
                   Object.entries(userStatusOptions).map((ele,index)=>{
                      // console.log(ele[1].value)
                    return (
                        <option  key={index}>{ele[1].label}</option>
                    )
                       }
                       )
                 
                  }
                </Form.Select>
                </Form.Group>
              </Col>
              <Col lg="3" md="12">
                <Form.Group className="mb-1">
                  <Form.Label>User Type</Form.Label>
                  <Form.Select
                  value={selectedTypeOption}
                  onChange={handleTypeStatus} >
                  {
                   Object.entries(userTypeOptions).map((ele,index)=>{
                      // console.log(ele[1].value)
                    return (
                        <option  key={index}>{ele[1].label}</option>
                    )
                       }
                       )
                 
                  }
                </Form.Select>
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
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                              type="text"
                              maxLength={15}
                              placeholder="Enter username"
                              value={firstname}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                            <span className="error-msg" style={{ color: "red" }}>
                              {formState?.errors["firstname"]}
                            </span>
                          </Form.Group>
                        </Col>
                        <Col lg="6" md="12">
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter email"
                              value={emailAddress}
                              onChange={(e) => setEmailAddress(e.target.value)}
                            />
                            <span className="error-msg" style={{ color: "red" }}>
                              {formState?.errors["emailAddress"]}
                            </span>
                          </Form.Group>
                        </Col>
                        <Col lg="6" md="12">
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                              type="text"
                              maxLength={15}
                              placeholder="Enter username"
                              value={lastname}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                            <span className="error-msg" style={{ color: "red" }}>
                              {formState?.errors["lastname"]}
                            </span>
                          </Form.Group>
                        </Col>
                        <Col lg="6" md="12">
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Phone Number:</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter phone"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <span className="error-msg" style={{ color: "red" }}>
                              {formState?.errors["phoneNumber"]}
                            </span>
                          </Form.Group>
                        </Col>
                        <Col lg="6" md="12" className="mt-3"></Col>
                      <Col lg="6" md="12" className="mt-3">
                        <Form.Label className="d-block">Password</Form.Label>
                        <Button className="brown-btn d-block text-end gray-btn"
                        //  onClick={() => resetUserPasswordBtn()}
                          >
                          Reset User Password
                        </Button>
                      </Col>
                      </Row>
                    </Col>
                    <Col lg="4" md="12">
                    <div>
                      <span className="single-userimg">
                        <span className="profile-imguser d-flex flex-column align-items-center">
                          <div className="position-relative userimg-editicon">
                            <img
                              src={imgData}
                              className="w-75 singleuserimage  rounded-circle"
                              alt=""
                            />
                            <a>
                              <FaRegEdit onClick={handleClick} />{" "}
                            </a>
                            <input
                              id="profilePic"
                              type="file"
                              ref={hiddenFileInput}
                              style={{ display: "none" }}
                              onChange={onChangePicture}
                            />
                          </div>
                        </span>
                        {/* <Figure>
                          <FaRegEdit />
                        </Figure> */}
                      </span>
                    </div>
                  </Col>
                  </Row>
                  <div className="savechanges-btn d-flex">
                    <Button className="brown-btn me-3"
                      onClick={handleSubmit}
                    >
                      Save Changes
                    </Button>
                    <Button className="brown-btn d-block gray-btn">Cancel</Button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </section>
      </div>




      {/* <Card>
        <CardBody>

<div className="d-flex mt-3">
          <div className="mb-4 mt-5 ml-5 fs-3 h4 card-title">User</div>
          <div>
            <Link to="/adduser"><button className="mx-5 my-5 px-3 py-1 h4 card-title btn-primary text-light ">Add User</button></Link>
          </div>
          </div>
          <form action="" >
            <div className="d-flex align-items-center">
              <div className="mx-3">
                <label htmlFor="">Search</label><br />
                <input type="text" id="Name" value={q} name="q" className="py-1 border border-secondary" placeholder="Search By Name and Email "
                 onChange={handleChange} required/>
              </div>
              <div className="mx-3" >
                <label htmlFor="">Active</label><br />
                <select name="active" id="active" value={select} onChange={handleSelectChange} className="py-1 px-5 w-100" required>
                <option value="select">Select</option>
                  <option value="1">Active</option>
                  <option value="0">Not Active</option>
                </select>
              </div>
              <div className="mx-3">
                <button type="button" className="btn-primary mt-3 px-4 py-2 w-100" onClick={Onclick}>Filter</button>
                </div>
            </div>

          </form>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">First Name </th>
                <th scope="col">Last Name  </th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Active</th>
              </tr>
            </thead>
            <tbody>
              {Datafilter.length > 0 ? (
                Datafilter?.map((item, index) => {
                  return (<tr key={index} >
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.email}</td>
                    <td>{item.phone_number}</td>
                    {
                      (item.status == 1) ? <Badge className="bg-success w-50">Active</Badge> : <Badge className="bg-danger w-50">Not Active</Badge>
                    }
                  </tr>)
                })
              ) : orders?.users?.user?.map((item, index) => {
                return (<tr key={index} >
                  <td>{item.firstname}</td>
                  <td>{item.lastname}</td>
                  <td>{item.email}</td>
                  <td>{item.phone_number}</td>
                  {
                    (item.status == 1) ? <Badge className="bg-success w-50">Active</Badge> : <Badge className="bg-danger w-50">Not Active</Badge>
                  }
                </tr>)
              })}
            </tbody>
          </table>


          {/* <ReactPaginate
           previousLabel= {"previous"}
           nextLabel={"next"}
           pageCount={5}
           onPageChange={handlePageClick}
           containerClassName={'pagination justify-content-center'}
           pageClassName={'page-item'}
           pageLinkClassName={'page-link'}
           previousClassName={'page-item'}
           previousLinkClassName={'page-link'}
           nextClassName={'page-item'}
           nextLinkClassName={'page-link'}
           activeClassName={"active"}
           ></ReactPaginate> 
        </CardBody>
      </Card> */}
    </React.Fragment>
  )
}

AddUser.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
}

export default withRouter(AddUser)
