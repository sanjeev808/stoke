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
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory,Redirect } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
// import { selectAuth, addRetailerAsync } from "../../auth/authSlice";
import { addRetailer } from "helpers/fakebackend_helper"


const AddRetailers = () => {
  const auth = JSON.parse(localStorage.getItem('authUser'));
  const authToken = auth?.data?.token
  const dispatch = useDispatch();
  let history = useHistory();
  const [firstname, setFirstName] = useState("");
  const [referralId, setReferralID] = useState("");
  const [formState, setFormState] = useState({
    errors: {},
  });
  const retailerData = {
    name: firstname,
    referral_id: referralId,
  };
  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;
    if (firstname.match(/[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]/)) {
      formIsValid = false;
      errors["firstname"] = "firstname cannot contain a special characters";
    }
    if (!firstname) {
      formIsValid = false;
      errors["firstname"] = "firstname cannot be empty";
    }
    if (!referralId) {
      formIsValid = false;
      errors["referralId"] = "Please enter Referral Number";
    }
    setFormState({ errors: errors });
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
   
      history.push("/chat")
      dispatch(addRetailer(retailerData,authToken,history));
    }
  };

  return (
    <div>
      <section className="main-dashboard position-relative" style={{ marginTop: 74, marginLeft: 15 }}>
        <div className="dashboard-right">
          <h2 className="dashboard-heading">Retailers Detail</h2>
          <Row className="active-userbox mt-4 ms-1"></Row>
          <Row>
            <Col lg="8" md="12">
              <div className="user-detailbox w-100 retailer-detailbox">
                <Row>
                  <Col xs lg="7" md="12">
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
                          <Form.Label>Referral:</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Referral"
                            value={referralId}
                            onChange={(e) => setReferralID(e.target.value)}
                          />
                          <span className="error-msg" style={{ color: "red" }}>
                            {formState?.errors["referralId"]}
                          </span>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <div className="savechanges-btn d-flex retailer-savchangesbtn">
                  <Button className="brown-btn me-3" onClick={handleSubmit}>
                    Save Changes
                  </Button>
                  <Button className="brown-btn d-block gray-btn" onClick={()=>history.push("/chat")}>Cancel</Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
};

export default AddRetailers;