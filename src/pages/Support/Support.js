import React, { useEffect } from "react"
import { Card, CardBody, Container } from "reactstrap"
import MetaTags from 'react-meta-tags';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

import { getusersNotification } from "store/actions";
import BootstrapTable from "react-bootstrap-table-next";
import Form from "react-bootstrap/Form";
import Switch from "react-switch";
import { AiOutlinePlusCircle } from "react-icons/ai";
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
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom";
import { BiExport } from "react-icons/bi";
// import { FiPhone } from "react-icons/fi";
import { FaRegCaretSquareLeft } from "react-icons/fa";
import {
  MdOutlineChevronLeft,
  MdOutlineChevronRight,
  MdOutlineAutoGraph,
} from "react-icons/md";
import { getSupport } from "store/actions";
// import { AiOutlinePlusCircle } from "react-icons/ai";
// import { RiUserAddLine } from "react-icons/ri";
// import { BsSquareFill } from "react-icons/bs";
// import { GrFormSearch } from "react-icons/gr";
const Support = () => {
  const history = useHistory()
const dispatch = useDispatch()

  const addNewTicket = () => {
    console.log("data get")
  }

  useEffect(() => {
      dispatch(getSupport());
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Support | Skote - React Admin & Dashboard Template</title>
        </MetaTags>
        <div className="dashboard-right">
          <div className="d-flex align-items-center mt-2">
            <h2 className="dashboard-heading">Support</h2>
            <Button onClick={addNewTicket} className="brown-btn ms-4">
              <AiOutlinePlusCircle className="me-2" />
              New Ticket
            </Button>
          </div>
          <div className="support-uppersec shadow w-100 py-3 px-4 mt-3">
            <Row>
              <Col lg="6">
                <div className="support-uppersec-left d-flex align-items-center">
                  <Form.Group className="me-3">
                    <Form.Check type="checkbox" id="disabledFieldsetCheck" />
                  </Form.Group>
                  <Form.Group className="d-flex align-items-center">
                    <Form.Label className="mb-0 me-2">Sort by:</Form.Label>
                    <Form.Select
                      id=""
                      className="border-0 support-select fw-bold px-1"
                    >
                      <option>Last Modified</option>
                      <option>Last Modified</option>
                      <option>Last Modified</option>
                      <option>Last Modified</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              </Col>
              <Col lg="6">
                <div className="support-uppersec-right d-flex align-items-center justify-content-end">
                  <Form.Group className="d-flex align-items-center">
                    <Form.Label className="mb-0 me-1">Layout:</Form.Label>
                    <Form.Select
                      id=""
                      className="border-0 support-select layout-select fw-bold px-1"
                    >
                      <option>Card View</option>
                      <option>Last Modified</option>
                      <option>Last Modified</option>
                      <option>Last Modified</option>
                    </Form.Select>
                  </Form.Group>
                  <span className="position-relative">
                    <Button
                      variant="primary"
                      type="submit"
                      className="shadow btn-light export-btn"
                    >
                      Export
                    </Button>
                    <BiExport className="position-absolute exportsign" />
                  </span>
                  <Form.Group>
                    <Form.Label className="mb-0 me-1 px-3">
                      1 - 30 of 98
                    </Form.Label>
                  </Form.Group>
                  <span>
                    <Button
                      variant="light"
                      type="submit"
                      className="shadow btn-light px-2 py-1"
                    >
                      <MdOutlineChevronLeft />
                    </Button>
                    <Button
                      variant="light"
                      type="submit"
                      className="shadow btn-light px-2 py-1 ms-1"
                    >
                      <MdOutlineChevronRight />
                    </Button>
                  </span>
                  <span>
                    <Button
                      variant="light"
                      type="submit"
                      className="shadow btn-light px-2 py-1 ms-2"
                    >
                      <FaRegCaretSquareLeft />
                    </Button>
                  </span>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default Support