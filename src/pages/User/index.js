
import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { withRouter, Link } from "react-router-dom"
import { isEmpty, set } from "lodash"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
// import { Button, Card, CardBody, Col, Row, Badge } from "reactstrap"
import { getOrders as onGetOrders } from "store/actions"
import { getusers } from "store/actions"
import EcommerceOrdersModal from "../Ecommerce/EcommerceOrders/EcommerceOrdersModal"
import { useHistory } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";
import paginationFactory from "react-bootstrap-table2-paginator";



import {
  Form,
  Button,
  Dropdown,
  Accordion,
  Row,
  Col,
  Table,
  Pagination,
  Modal,
} from "react-bootstrap";
import { DebounceInput } from "react-debounce-input";



//paginate
import ReactPaginate from "react-paginate"
//redux
import { useSelector, useDispatch } from "react-redux"

const user = props => {

  const [userName, setUserName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userphone, setUserPhone] = useState("");
  const [userImage, setUserImage] = useState("");
  const [userID, setUserID] = useState("");
  const [pageNumber, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchUsers, setSearchUsers] = useState("");
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [selectedOption, SetSelectedOption] = useState("");
  const [selectedStatusOption, SetSelectedStatusOption] = useState("");
  const [selectedTypeOption, SetSelectedTypeOption] = useState("");
  const [firstname, setFirstName] = useState("");
  const [formState, setFormState] = useState({ errors: {}, });
  const [updateUserModal, setupdateUserModal] = useState(false);
  const [userSearch, setUserSearch] = useState("")


  const history = useHistory()
  const dispatch = useDispatch();

  const userinfo = useSelector(state => state?.Userlist)
  const DataFilterArr = [];
  const dataOrder = userinfo?.users?.user;
  // console.log("data orders", dataOrder)


  const [items] = React.useState([
    { label: "All", value: 3, },
    { label: "Admin", value: 1 },
    { label: "User", value: 2 },
  ]);
  const [statusItems] = React.useState([
    { value: 0, label: "All" },
    { value: 1, label: "Active" },
    { value: 2, label: "Archived" },
    { value: 3, label: "Suspended" },
  ]);
  const statusOptions = [
    { value: 0, label: "All" },
    { value: 1, label: "Active" },
    { value: 2, label: "Archived" },
    { value: 3, label: "Suspended" },
  ];
  const userTypeOptions = [
    { value: 3, label: "All" },
    { value: 1, label: "Admin" },
    { value: 2, label: "User" },
  ];

  const addUser = () => {
    history.push("/user/add");
  };

  const columns = [
    {
      dataField: "profile_image",
      sort: true,
      formatter: (col, row) => {
        if (col) return <img alt="" src={col} style={{ width: 50, borderRadius: 50 }} />;
      },
    },
    {
      dataField: "firstname",
      text: "First Name",
      sort: true,
    },
    {
      dataField: "lastname",
      text: "Last Name",
      sort: true,
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
    },
    {
      dataField: "role_id",
      text: "Type",
      formatter: (col, row) => {
        if (col == 1) {
          return "Admin";
        }
        if (col == 2) {
          return "User";
        }
        if (col == 3) {
          return "Retailer";
        }
      },
    },
    {
      dataField: "",
      text: "Action",
      sort: false,
      formatter: (col, row) => {
        return (
          <>
            <a className="edit-use">
              <FaRegEdit onClick={() => updateUserModalBtn(row)} />
            </a>
          </>
        );
      },
    },
    {
      dataField: "active",
      text: "Status",
      sort: false,
      formatter: (col, row) => {
        if (col == 1) {
          return <span className="active-btn"> Active</span>;
        }
        if (col == 0) {
          return <span className="inactive-btn">Suspended </span>;
        }
        if (col == 2) {
          return <span className="inactive-btn">Archived </span>;
        }
      },
    },
  ]

  const updateUserModalBtn = (row) => {
    history.push({
      pathname: "/user/edituser",
      state: { ...row, },
    });
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
    setFormState({ errors: errors });
    return formIsValid;
  };
  const handleChangeStatus = async (e) => {
    console.log("change status", e.target.value)
    SetSelectedStatusOption(e.target.value);
  };
  const handleTypeStatus = async (e) => {
    // console.log(" user Type status", e.target.value)
    SetSelectedTypeOption(e.target.value);
  };
  const handleOnUserSearch = (e) => {
    // console.log("search ", e.target.value)
    setUserSearch(e.target.value);
  };
  // console.log("set user  value", userSearch)

  let postData1 = {
    sort: -1,
    pageNumber: pageNumber,
    active: selectedStatusOption
      ? selectedStatusOption == 4
        ? "0"
        : selectedStatusOption
      : "",
  };
  // if (searchUsers) {
  //   postData1.searchParam = searchUsers || "";
  // }
  // if (selectedTypeOption) {
  //   postData1.role_id = selectedTypeOption || " +''+";
  // }
  useEffect(() => {
    if(authToken)
    {
      console.log("authToken found")
    dispatch(getusers(postData1,authToken));
    }
    else{
      console.log("authToken is not  found")
    }
  }, [dispatch, authToken, pageNumber, selectedStatusOption, selectedTypeOption,
  ]);

  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  dataOrder?.map((ele) => {
    if (ele.firstname == userSearch || ele.role_id == selectedTypeOption ) {
      DataFilterArr.push(ele)
    }
  })
  // dataOrder?.map((ele) => {
  //   if (ele.status == selectedStatusOption)
  //     console.log("dsdw",ele)
  //     DataFilterArr.push(ele)
  // })
  console.log(DataFilterArr, "sksb")


  return (
    <div>
      <div className="dashboard-right" style={{ margin: "8% 2%" }}>
        <div className="d-flex align-items-center mt-4">
          <h2 className="dashboard-heading">Users</h2>
          <Button onClick={addUser} className="brown-btn ms-4">
            <FiUserPlus className="me-2" />
            Add New User
          </Button>
        </div>
      </div>
      <div className="user-box m-2">
        <Row>
          <Col lg="12" md="12">
            <Row>
              <Col lg="5" md="12">

                {/* <form className="app-search d-none d-lg-block">
              <div className="position-relative px-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="search..."  
                  onChange={()=>{handleSearch}}
                />
                <span className="bx bx-search-alt" />
              </div>
            </form> */}

                <Form.Group
                  className=" position-relative searchbox d-flex flex-column user-box new-searchbox"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Search</Form.Label>
                  <Form.Control 
                  type="text"
                  name="" 
                  id="" 
                  placeholder="Search"
                  value={userSearch} 
                  onChange={handleOnUserSearch} />
                  {/* <DebounceInput
                    minLength={2}
                    debounceTimeout={300}
                    value={searchUsers}
                    className="mt-2"
                    onChange={(e) => {
                      handleOnUserSearch(e, "search");
                    }}
                  /> */}
                  {/* <AiOutlineSearch className="position-absolute search-icon" />  */}
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
              </Col>
              <Col
                lg="2"
                md="12"
                className="newuserbox pt-0 d-flex flex-column"
              > 
                <label className="mb-1">Filter by user type</label>
                <select onChange={handleTypeStatus} className='w-100 py-1  px-1 mt-1 rounded' style={{border:"1px solid #ced4da",color:"#495057"}}>
                  {items.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </Col>
              <Col   
                lg="2"
                md="12"
                className="newuserbox pt-0 d-flex flex-column"
              >
                {/* <label className="mb-1">Filter by status</label> */}

              
                {/* <select className="" onChange={handleChangeStatus}>
                  {statusItems.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select> */}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div>
        <Row className="m-4">
          <Col lg="12" md="12">
            <div className="userbox position-relative add-newuser">
           
              {DataFilterArr.length > 0 ? 
              <BootstrapTable
                condensed
                hover
                keyField="id"
                responsive={true}
                bordered={true}
                data={DataFilterArr || []}
                columns={columns}
                pagination={paginationFactory({ sizePerPage: 10 })}
              />
                : 
                <BootstrapTable
                  condensed
                  hover
                  keyField="id"
                  responsive={true}
                  bordered={true}
                  data={userinfo?.users?.user || []}
                  columns={columns}
                  pagination={paginationFactory({ sizePerPage: 10 })}
                />
              }
            </div>
          </Col>
        </Row>
      </div>


    </div>
  )
}

user.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
}

export default withRouter(user)
