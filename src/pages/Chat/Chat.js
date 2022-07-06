import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { CgAdd } from "react-icons/cg";
import { AiOutlineSearch } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { RiArrowUpDownFill } from "react-icons/ri";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import Select from "react-select";
import { getRetailer } from "../../store/Retailers/actions"
import { Editretailer } from "../../store/EditRetailer/actions"

// import {
//   selectAuth,
//   getRetailersListAsync,
//   retailersList,
//   searchRetailersAsync,
//   updateRetailersAsync,
// } from "../../auth/authSlice";

const Retailers = () => {
  const auth = JSON.parse(localStorage.getItem('authUser'));
  const authToken = auth?.data?.token
  const dispatch = useDispatch();
  const retailersInfo = useSelector(state=>state?.RetailerList)
  
  const [searchRetailers, setSearchRetailers] = useState("");
  const [updateRetailerModal, setupdateRetailerModal] = useState(false);
  const [retailerName, setRetailerName] = useState("");
  const [retailerID, setRetailerID] = useState("");
  const [selectedOption, SetSelectedOption] = useState("");
  const statusOptions = [
    { value: 0, label: "InActive" },
    { value: 1, label: "Active" },
  ];
  const [page, setPage] = useState(1);
  const [formState, setFormState] = useState({
    errors: {},
  });

  let history = useHistory();

  // useEffect(() => {
  //   if (authToken) {
  //     dispatch(getRetailersListAsync({ page, authToken }));
  //   }
  // }, [dispatch, authToken,page]);

  const addUser = () => {
    history.push("/add-retailer");
  };

  const columns = [
    {
      dataField: "name",
      text: "Retailers",
      sort: true,
    },
    {
      dataField: "referral_id",
      text: " Referral Id",
      sort: true,
    },
    {
      dataField: "createdAt",
      text: "Date",
      formatter: (col, row) => moment(row.createdAt).format("lll"),
    },
    {
      dataField: "active",
      text: "Status",
      sort: false,
      // headerStyle: (colum, colIndex) => ({ width: '10%', textAlign: 'left' }),
      formatter: (col, row) => {
        if (col == 1) {
          return <span className="active-btn">Active</span>;
        }
        if (col == 0) {
          return "InActive";
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
            <a href="#">
              <FaRegEdit onClick={() => updateRetailerModalBtn(row)} />
            </a>
            {/* <a href="#">
              <ImCancelCircle className="ms-3" />
            </a> */}
          </>
        );
      },
    },
  ];
  const EditretailerData ={
     name: retailerName,
          retailer_id: retailerID,
          active: selectedOption.value,
  }
  console.log("21313",EditretailerData)
  const updateRetailersData = async (e) => {
    e.preventDefault();
    // if (handleValidation()) {
    await dispatch(
      Editretailer({EditretailerData, authToken}));
    // }
    setupdateRetailerModal(false);
    await dispatch(getRetailer({ page, authToken }));
  };

  const updateRetailerModalBtn = (row) => {
    setRetailerID(row?._id);
    setRetailerName(row?.name);
    SetSelectedOption(
      statusOptions.filter((i) => (i.value === row?.active) == 1)[0] || ""
    );
    setupdateRetailerModal(updateRetailerModal ? false : true);
  };

  const options = {
    onSizePerPageChange: (sizePerPage, page) => {
      console.log("Size per page change!!!");
      console.log("Newest size per page:" + sizePerPage);
      console.log("Newest page:" + page);
    },
    onPageChange: (page, sizePerPage) => {
      console.log("Page change!!!");
      console.log("Newest size per page:" + sizePerPage);
      console.log("Newest page:" + page);
    },
  };

  const handleOnRetailerSearch = (e) => {
    setSearchRetailers(e.target.value);
    // dispatch(getRetailersListAsync({ postData: { searchParam: searchRetailers, sort:-1,pageNumber:1,recordsLimit:10},authToken}));
  };

  const handleChange = async (e) => {
    SetSelectedOption(e);
  };

  useEffect(() => {
    if (authToken && searchRetailers !== "") {
      dispatch(
        searchRetailersAsync({
          postData: {
            searchParam: searchRetailers,
            sort: -1,
            pageNumber: page,
            recordsLimit: 10,
          },
          authToken,
        })
      );
    }
    if (authToken && searchRetailers == "") {
      dispatch(getRetailer({ page, authToken }));
    }
  }, [dispatch, authToken, page, searchRetailers]);

  return (
    <div>
      <section className="main-dashboard position-relative">
        <div className="dashboard-right" style={{ margin: "8% 2%" }}>
          <div className="d-flex align-items-center mt-2">
            <h2 className="dashboard-heading">Retailers</h2>
            <Button onClick={addUser} className="brown-btn ms-4">
              <CgAdd className="me-2" />
              Add New
            </Button>
          </div>
          <div className="user-box mt-3">
            <Row>
              <Col lg="12" md="12">
                <Row>
                  <Col lg="4" md="12">
                    {/* <input type="text" placeholder="Search" value={searchRetailers} name="search"  onChange={(e) => {
                            handleOnRetailerSearch(e, 'search')
                          }} /> */}
                   <Form.Group
                      className="mb-3 position-relative searchbox"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Search</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Search"
                        name="search"
                        value={searchRetailers}
                        onChange={(e) => {
                          handleOnRetailerSearch(e, "search");
                        }}
                      />
                      <Form.Text className="text-muted"></Form.Text>
                      <AiOutlineSearch className="position-absolute search-icon" />
                    </Form.Group>
                  </Col>
                  {/* <Col lg="2" md="12">
                    <Form.Group className="mb-3">
                      <Form.Label>Filter by</Form.Label>
                      <Form.Select id="#">
                        <option>All types</option>
                        <option>select2</option>
                        <option>select3</option>
                      </Form.Select>
                    </Form.Group>
                  </Col> */}
                </Row>
                {/* <Row className="my-3">
                  <Col lg="2" md="12">
                    <Form.Group className="">
                      <Form.Select id="#">
                        <option>Bulk Actions</option>
                        <option>select2</option>
                        <option>select3</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col
                    lg="4"
                    md="12"
                    className="d-flex align-items-center select-item"
                  >
                    <Button variant="dark" size="sm" className="px-3 dark-btn">
                      Apply to Selected
                    </Button>
                    <p className="mb-0">1 item selected</p>
                    <a href="#">Deselect all</a>
                  </Col>
                  <Col xs lg="2" md="12"></Col>
                </Row> */}
              </Col>
            </Row>
          </div>
          <div>
            <Row className="mt-3">
              <Col lg="12" md="12">
                <div className="userbox position-relative retailer-table">
                  <BootstrapTable
                    condensed
                    hover
                    keyField="id"
                    responsive={true}
                    bordered={true}
                    data={retailersInfo?.retailer?.user || []}
                    columns={columns}
                    // selectRow={ { mode: 'checkbox', clickToSelect: true } }
                    pagination={paginationFactory({
                      sizePerPage: 10,
                      // totalSize: 50,
                      totalSize: retailersInfo?.data?.count || 0,
                      page: page,
                      onPageChange: (page, sizePerPage) => {
                        setPage(page);
                        sizePerPage(page);
                      },
                      onSizePerPageChange: (sizePerPage) => {
                        sizePerPage(page);
                      },
                    })}
                  />
                </div>
              </Col>
            </Row>
            <Modal show={updateRetailerModal} onHide={updateRetailerModalBtn}>
              <Modal.Header closeButton>
                <Modal.Title>Update Retailers Details </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {" "}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Retailers Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={retailerName}
                    //  defaultValue={user_name || ""}
                    onChange={(e) => setRetailerName(e.target.value)}
                  />
                  <span className="error-msg" style={{ color: "red" }}>
                    {formState?.errors["firstname"]}
                  </span>
                </Form.Group>
                <Select
                  value={selectedOption}
                  onChange={handleChange}
                  options={statusOptions}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={updateRetailerModalBtn}>
                  Close
                </Button>
                <Button variant="primary" onClick={updateRetailersData}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Retailers;
















// import React, { useEffect, useState } from "react"
// import PropTypes from "prop-types"
// import { withRouter, Link } from "react-router-dom"
// import { isEmpty, set } from "lodash"
// import BootstrapTable from "react-bootstrap-table-next"
// import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
// // import { Button, Card, CardBody, Col, Row, Badge } from "reactstrap"
// import { getOrders as onGetOrders } from "store/actions"
// import { getRetailer } from "../../store/Retailers/actions"
// import EcommerceOrdersModal from "../Ecommerce/EcommerceOrders/EcommerceOrdersModal"
// import { useHistory } from "react-router-dom";
// import { FaRegEdit } from "react-icons/fa";
// import { FiUserPlus } from "react-icons/fi";
// import { AiOutlineSearch } from "react-icons/ai";
// import paginationFactory from "react-bootstrap-table2-paginator";
// import moment from "moment";
// import Select from "react-select";
// import {
//   Form,
//   Button,
//   Dropdown,
//   Accordion,
//   Row,
//   Col,
//   Table,
//   Pagination,
//   Modal,
// } from "react-bootstrap";
// import { DebounceInput } from "react-debounce-input";



// //paginate
// import ReactPaginate from "react-paginate"
// //redux
// import { useSelector, useDispatch } from "react-redux"
// import { Input } from "reactstrap"
// import { Editretailer } from "store/actions"
// const user = props => {

//   const [userName, setUserName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [userEmail, setUserEmail] = useState("");
//   const [userphone, setUserPhone] = useState("");
//   const [userImage, setUserImage] = useState("");
//   const [userID, setUserID] = useState("");
//   // const [page, setPage] = useState(1);

//   const [firstname, setFirstName] = useState("");
//   const auth = useSelector(state => state.Login?.userDetails);
//   // console.log("auth data get", auth)
//   const authToken = auth?.data?.token
//   // console.log("auth data get", authToken)
// const userinfo = useSelector(state=>state?.RetailerList)
// // console.log("data",userinfo?.retailer?.user?.name)

// const filterdata =userinfo?.retailer?.user
// // console.log("filter data",userinfo)


// const [pageNumber, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [searchdata, setSearchUsers] = useState("");
//   const [picture, setPicture] = useState(null);
//   const [imgData, setImgData] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(true);

//   const history = useHistory()
//   const [formState, setFormState] = useState({
//     errors: {},
//   });
//   const dispatch = useDispatch();

//   const [selectedStatusOption, SetSelectedStatusOption] = useState("");
//   const [selectedTypeOption, SetSelectedTypeOption] = useState("");
//   const [updateRetailerModal, setupdateRetailerModal] = useState(false);
//   const [retailerName, setRetailerName] = useState("");
//   const [retailerID, setRetailerID] = useState("");
//   const [selectedOption, SetSelectedOption] = useState("");
//   const [editSeletedOption,setEditSeletedOption] = useState("");
//   const [userSearch,setUserSearch] = useState("")
//   const [filtername,setFiltername] = useState("")

//   const DataFilterArr=[]

//   const [items] = React.useState([
//     {
//       label: "All",
//       value: 3,
//     },
//     { label: "Admin", value: 1 },
//     { label: "User", value: 2 },
//   ]);
//   const [statusItems] = React.useState([
//     { value: 3, label: "All" },
//     { value: 1, label: "Active" },
//     { value: 2, label: "Archived" },
//     { value: 0, label: "Suspended" },
//   ]);
//   const statusOptions = [
//     { value: 1, label: "Active" },
//     { value: 2, label: "Archived" },
//     { value: 3, label: "All" },
//     { value: 0, label: "Suspended" },
//   ];
//   const sOptions = [
//     { value: 0, label: "Suspended" },
//     { value: 1, label: "Active" },
//   ];
//   const userTypeOptions = [
//     { value: 3, label: "All" },
//     { value: 1, label: "Admin" },
//     { value: 2, label: "User" },
//   ];
//   const statusType = [
//     { value: 0, label: "InActive" },
//     { value: 1, label: "Active" },
//   ];
 
//   const addUser = () => {
//     history.push("/retailer/add");
//   };

//   const columns = [
//     {
//       dataField: "name",
//       text: "Retailers",
//       sort: true,
//     },
//     {
//       dataField: "referral_id",
//       text: " Referral Id",
//       sort: true,
//     },
//     {
//       dataField: "createdAt",
//       text: "Date",
//       formatter: (col, row) => moment(row.createdAt).format("lll"),
//     },
//     {
//       dataField: "active",
//       text: "Status",
//       sort: false,
//       // headerStyle: (colum, colIndex) => ({ width: '10%', textAlign: 'left' }),
//       formatter: (col, row) => {
//         if (col == 1) {
//           return <span className="active-btn">Active</span>;
//         }
//         if (col == 0) {
//           return "InActive";
//         }
//       },
//     },
//     {
//       dataField: "",
//       text: "Action",
//       sort: false,
//       formatter: (col, row) => {
//         return (
//           <>
//               <FaRegEdit onClick={() => updateRetailerModalBtn(row)} />
//            </>
//         );
//       },
//     },
//   ];
//   const updateRetailerModalBtn = (row) => {
//     setRetailerID(row?._id);
//     setRetailerName(row?.name);
//     setEditSeletedOption(
//       statusType.filter((i) => (i.value === row?.active) == 1)[0] || ""
//       );
//       // SetSelectedOption(row?.active);
//       setupdateRetailerModal(updateRetailerModal ? false : true);
//     };
    
//     console.log(editSeletedOption.value,"dcfsd")
//     const updateRetailersData = (e)=>
//     {
//       e.preventDefault();
//       dispatch(Editretailer({
//           postData: {
//             name: retailerName,
//             retailer_id: retailerID,
//             active: editSeletedOption,
//           },
//         })
//       );
//       // console.log("active values",postData)
//       setupdateRetailerModal(false);
//       dispatch(getRetailer(pageNumber));
//       history.push("/chat")
//     }

//   const options = {
//     onSizePerPageChange: (sizePerPage, page) => {
//       console.log("Size per page change!!!");
//       console.log("Newest size per page:" + sizePerPage);
//       console.log("Newest page:" + page);
//     },
//     onPageChange: (page, sizePerPage) => {
//       console.log("Page change!!!");
//       console.log("Newest size per page:" + sizePerPage);
//       console.log("Newest page:" + page);
//     },
//   };
 
 
//   const handleValidation = () => {
//     let errors = {};
//     let formIsValid = true;
//     if (firstname.match(/[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]/)) {
//       formIsValid = false;
//       errors["firstname"] = "firstname cannot contain a special characters";
//     }
//     if (!firstname) {
//       formIsValid = false;
//       errors["firstname"] = "firstname cannot be empty";
//     }
//     setFormState({ errors: errors });
//     return formIsValid;
//   };

 
//   const handleChange = async (e) => {
//     SetSelectedOption(e);
//   };
//   const handleChangeStatus = async (e) => {
//     SetSelectedStatusOption(e.target.value);
//   };
//   const handleTypeStatus = async (e) => {
//     SetSelectedTypeOption(e.target.value);
//   };
//   const handleOnUserSearch = (e) => {
//     setUserSearch(e.target.value);
//   };
//   // console.log("set user  value",userSearch)
  
  

//   let postData1 = {
//     sort: -1,
//     pageNumber: pageNumber,
//     // recordsLimit: 10,
//     // role_id: selectedTypeOption.value || "",
//     active: selectedStatusOption
//       ? selectedStatusOption == 4
//         ? "0"
//         : selectedStatusOption
//       : "",
//   };
//   useEffect(() => {
//     dispatch(getRetailer(postData1));
//   }, [dispatch, authToken, pageNumber, selectedStatusOption, selectedTypeOption,
//   ]);

//   const onChangePicture = (e) => {
//     if (e.target.files[0]) {
//       setPicture(e.target.files[0]);
//       const reader = new FileReader();
//       reader.addEventListener("load", () => {
//         setImgData(reader.result);
//       });
//       reader.readAsDataURL(e.target.files[0]);
//     }
//   };
//   userinfo?.retailer?.user?.map((ele)=>{
//  if(ele.name==userSearch){
//   DataFilterArr.push(ele)
//   // setFiltername(DataFilterArr)
//  }
//   })
  
//   // console.log(DataFilterArr,"filter  by name")
 
 

//   return (
//     <div>
//       <div className="dashboard-right" style={{ margin: "8% 2%" }}>
//         <div className="d-flex align-items-center mt-4">
//           <h2 className="dashboard-heading">Retailer</h2>
//           <Button onClick={addUser} className="brown-btn ms-4">
//             <FiUserPlus className="me-2" />
//             Add New Retailer
//           </Button>
//         </div>
//       </div>
//       <div className="user-box m-3">
//         <Row>
//           <Col lg="12" md="12">
//             <Row>
//               <Col lg="5" md="12">
//                 <Form.Group
//                   className="mb-3 position-relative searchbox d-flex flex-column user-box new-searchbox"
//                   controlId="formBasicEmail"
//                 >
//                   <Form.Label>Search</Form.Label>
//                   <Form.Control 
//                   type="text" 
//                   name=""
//                   id=""
//                   placeholder="Search"
//                   value={userSearch}
//                   onChange={handleOnUserSearch} />
//                   {/* <DebounceInput
//                     minLength={2}
//                     debounceTimeout={300}
//                     value={searchUsers}
//                     className="mt-2"
//                     onChange={(e) => {
//                       handleOnUserSearch(e, "search");
//                     }}
//                   /> */}
//                   {/* <AiOutlineSearch className="position-absolute search-icon" /> */}
//                   <Form.Text className="text-muted"></Form.Text>
//                 </Form.Group>
//               </Col>
//             </Row>
//           </Col>
//         </Row>
//       </div>
//       <div>
//             <Row className="m-4">
//               <Col lg="12" md="12">
//                 <div className="userbox position-relative add-newuser">
//                  {DataFilterArr.length > 0 ?     
//                       <BootstrapTable
//                       condensed
//                       hover
//                       keyField="id"
//                       responsive={true}
//                       bordered={true}
//                       data={DataFilterArr || [] }
//                       columns={columns}
//                       pagination={paginationFactory({ sizePerPage: 10 })}
//                     /> :
//                      <BootstrapTable
//                     condensed
//                     hover
//                     keyField="id"
//                     responsive={true}
//                     bordered={true}
//                     data={userinfo?.retailer?.user || [] }
//                     columns={columns}
//                     pagination={paginationFactory({ 
//                     sizePerPage: 10,
//                     totalSize: userinfo?.retailer?.user || 0,
//                     page: pageNumber,
//                     onPageChange: (page, sizePerPage) => {
//                       setPage(page);
//                       sizePerPage(page);
//                     },
//                     onSizePerPageChange: (sizePerPage) => {
//                       sizePerPage(page);
//                     },
                    
//                     })}
//                   />
//                   } 
//                 {/* <BootstrapTable
//                       condensed
//                       hover
//                       keyField="id"
//                       responsive={true}
//                       bordered={true}
//                       data={userinfo?.retailer?.user || [] }
//                       columns={columns}
//                       pagination={paginationFactory({ sizePerPage: 10 })}
//                     /> */}

//                   </div>
//                   </Col>
//                   </Row>
//                    <Modal show={updateRetailerModal} onHide={updateRetailerModalBtn}>
//               <Modal.Header closeButton>
//                 <Modal.Title>Update Retailers Details </Modal.Title>
//               </Modal.Header>
//               <Modal.Body>
//                 {" "}
//                 <Form.Group className="mb-3" controlId="formBasicEmail">
//                   <Form.Label>Retailers Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={retailerName}
//                     //  defaultValue={user_name || ""}
//                     onChange={(e) => setRetailerName(e.target.value)}
//                   />
//                   <span className="error-msg" style={{ color: "red" }}>
//                     {formState?.errors["firstname"]}
//                   </span>
//                 </Form.Group>
//                 <Form.Group className="mb-1">
//                 <Form.Label>User Status</Form.Label>
//                 <Select
//                    value={editSeletedOption}
//                    onChange={handleChange}
//                    options={statusType}
//                 />
//               </Form.Group>

//                 {/* <Form.Select
//                   value={editSeletedOption.value}
//                   onChange={handleChange}
//                   options={statusType}
//                 /> */}
//               </Modal.Body>
//               <Modal.Footer>
//                 <Button variant="secondary" onClick={updateRetailerModalBtn}>
//                   Close
//                 </Button>
//                 <Button variant="primary" onClick={updateRetailersData}>
//                   Save Changes
//                 </Button>
//               </Modal.Footer>
//             </Modal> 
//                   </div>
                  

//     </div>
//   )
// }

// user.propTypes = {
//   orders: PropTypes.array,
//   onGetOrders: PropTypes.func,
// }

// export default withRouter(user)