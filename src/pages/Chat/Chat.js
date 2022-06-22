
import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { withRouter, Link } from "react-router-dom"
import { isEmpty} from "lodash"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import { Button, Card, CardBody, Col, Row, Badge } from "reactstrap"
import { getOrders as onGetOrders } from "store/actions"
import { getRetailer } from "store/actions"
import EcommerceOrdersModal from "../Ecommerce/EcommerceOrders/EcommerceOrdersModal"

//paginate
import ReactPaginate from "react-paginate"
//redux
import { useSelector, useDispatch } from "react-redux"
import userProfile from "pages/Authentication/user-profile"

const Chat = props => {

  const [Datafilter, setDatafilter] = useState("");
  const [select, setSelect] = useState("")
  const dispatch = useDispatch()
  const orders = useSelector(state => state?.RetailerList)
  useEffect(() => {
    dispatch(getRetailer())
    setItems(orders)
  }, [dispatch]);
  const [q, setQ] = useState("")
  // const DataFilterArr = [];
  const dataOrder =  orders?.retailer.user
// console.log("data orders",dataOrder)

// dataOrder.map((ele)=>{
//   console.log("data map values",ele)
// })

// function DataSubmit(){
//   dataOrder?.filter((ele) => {
//     if (q && select) {
//       if (q == ele.firstname && select == ele.status) { 
//         DataFilterArr.push(ele);
//         console.log(DataFilterArr);
//     }
//   }

  // }
  // )
// }
// function Onclick(e){
// DataSubmit();
// setDatafilter(DataFilterArr);
// }

function handleSelectChange(e){
  setSelect(e.target.value)
  if(e.target.value=="select"){
    setSelect("")
  }
}

function handleChange(e) {
    
    setQ(e.target.value)
  }
  // console.log(DataFilterArr, "arr")
  const [orderList, setOrderList] = useState([])
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    if (orders && !orders.length) {
      onGetOrders()
    }
  }, [onGetOrders, orders])

  useEffect(() => {
    setOrderList(orders)
  }, [orders])

  useEffect(() => {
    if (!isEmpty(orders) && !!isEdit) {
      setOrderList(orders)
      setIsEdit(false)
    }
  }, [orders])

  const [items, setItems] = useState([])

  console.log(q, "fff")
  return (
    <React.Fragment>
      <Card>
        <CardBody>

<div className="d-flex mt-3">
          <div className="mb-4 mt-5 ml-5 fs-3 h4 card-title">Retailer</div>
          <div>
            <Link to="/user/add"><button className="mx-5 my-5 px-3 py-1 h4 card-title btn-primary text-light ">Add User</button></Link>
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
              {/* <div className="mx-3">
                <button type="button" className="btn-primary mt-3 px-4 py-2 w-100" onClick={Onclick}>Filter</button>
                </div> */}
            </div>

          </form>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">Retailers </th>
                <th scope="col">Referral Id </th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
           {dataOrder?.map((item, index) => {
                return (<tr key={index} >
                  <td>{item.name}</td>
                  <td>{item.referral_id}</td>
                  <td>{item.updatedAt}</td>
                  {
                    (item.active == 1) ? <Badge className="bg-success w-50">Active</Badge> : <Badge className="bg-danger w-50">Not Active</Badge>
                  }
                </tr>)
            })
              }
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
           ></ReactPaginate> */}
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

Chat.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
}

export default withRouter(Chat)













// import React, { useEffect, useState } from "react";
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
// // import Latestuser from "../../../assets/images/latestuser-img.png";
// import { useDispatch, useSelector } from "react-redux";
// // import { toast } from "../../../utils/Toast";
// import moment from "moment";
// import { useHistory } from "react-router-dom";
// import Sidebar from "../Sidebar";
// import Header from "../Header";
// import { CgAdd } from "react-icons/cg";
// import { AiOutlineSearch } from "react-icons/ai";
// import { FaRegEdit } from "react-icons/fa";
// // import { ImCancelCircle } from "react-icons/im";
// // import { RiArrowUpDownFill } from "react-icons/ri";
// import BootstrapTable from "react-bootstrap-table-next";
// import paginationFactory from "react-bootstrap-table2-paginator";
// import Select from "react-select";

// // import {
// //   selectAuth,
// //   getRetailersListAsync,
// //   retailersList,
// //   searchRetailersAsync,
// //   updateRetailersAsync,
// // } from "../../auth/authSlice";

// const Retailers = () => {
//   const auth = useSelector(selectAuth);
//   const dispatch = useDispatch();
//   const authToken = auth?.data?.token;
//   const retailersInfo = useSelector(retailersList);
//   const [searchRetailers, setSearchRetailers] = useState("");
//   const [updateRetailerModal, setupdateRetailerModal] = useState(false);
//   const [retailerName, setRetailerName] = useState("");
//   const [retailerID, setRetailerID] = useState("");
//   const [selectedOption, SetSelectedOption] = useState("");
//   const statusOptions = [
//     { value: 0, label: "InActive" },
//     { value: 1, label: "Active" },
//   ];
//   const [page, setPage] = useState(1);
//   const [formState, setFormState] = useState({
//     errors: {},
//   });

//   let history = useHistory();

//   // useEffect(() => {
//   //   if (authToken) {
//   //     dispatch(getRetailersListAsync({ page, authToken }));
//   //   }
//   // }, [dispatch, authToken,page]);

//   const addUser = () => {
//     history.push("/add-retailer");
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
//             <a href="#">
//               <FaRegEdit onClick={() => updateRetailerModalBtn(row)} />
//             </a>
//             {/* <a href="#">
//               <ImCancelCircle className="ms-3" />
//             </a> */}
//           </>
//         );
//       },
//     },
//   ];
//   const updateRetailersData = async (e) => {
//     e.preventDefault();
//     // if (handleValidation()) {
//     await dispatch(
//       updateRetailersAsync({
//         postData: {
//           name: retailerName,
//           retailer_id: retailerID,
//           active: selectedOption.value,
//         },
//         authToken,
//       })
//     );
//     // }
//     setupdateRetailerModal(false);
//     await dispatch(getRetailersListAsync({ page, authToken }));
//   };

//   const updateRetailerModalBtn = (row) => {
//     setRetailerID(row?._id);
//     setRetailerName(row?.name);
//     SetSelectedOption(
//       statusOptions.filter((i) => (i.value === row?.active) == 1)[0] || ""
//     );
//     setupdateRetailerModal(updateRetailerModal ? false : true);
//   };

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

//   const handleOnRetailerSearch = (e) => {
//     setSearchRetailers(e.target.value);
//     // dispatch(getRetailersListAsync({ postData: { searchParam: searchRetailers, sort:-1,pageNumber:1,recordsLimit:10},authToken}));
//   };

//   const handleChange = async (e) => {
//     SetSelectedOption(e);
//   };

//   useEffect(() => {
//     if (authToken && searchRetailers !== "") {
//       dispatch(
//         searchRetailersAsync({
//           postData: {
//             searchParam: searchRetailers,
//             sort: -1,
//             pageNumber: page,
//             recordsLimit: 10,
//           },
//           authToken,
//         })
//       );
//     }
//     if (authToken && searchRetailers == "") {
//       dispatch(getRetailersListAsync({ page, authToken }));
//     }
//   }, [dispatch, authToken, page, searchRetailers]);

//   return (
//     <div>
//       <Header />
//       <section className="main-dashboard position-relative">
//         <Sidebar />

//         <div className="dashboard-right">
//           <div className="d-flex align-items-center mt-2">
//             <h2 className="dashboard-heading">Retailers</h2>
//             <Button onClick={addUser} className="brown-btn ms-4">
//               <CgAdd className="me-2" />
//               Add New
//             </Button>
//           </div>
//           <div className="user-box mt-3">
//             <Row>
//               <Col lg="12" md="12">
//                 <Row>
//                   <Col lg="4" md="12">
//                     {/* <input type="text" placeholder="Search" value={searchRetailers} name="search"  onChange={(e) => {
//                             handleOnRetailerSearch(e, 'search')
//                           }} /> */}
//                     <Form.Group
//                       className="mb-3 position-relative searchbox"
//                       controlId="formBasicEmail"
//                     >
//                       <Form.Label>Search</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Search"
//                         name="search"
//                         value={searchRetailers}
//                         onChange={(e) => {
//                           handleOnRetailerSearch(e, "search");
//                         }}
//                       />
//                       <Form.Text className="text-muted"></Form.Text>
//                       <AiOutlineSearch className="position-absolute search-icon" />
//                     </Form.Group>
//                   </Col>
//                   {/* <Col lg="2" md="12">
//                     <Form.Group className="mb-3">
//                       <Form.Label>Filter by</Form.Label>
//                       <Form.Select id="#">
//                         <option>All types</option>
//                         <option>select2</option>
//                         <option>select3</option>
//                       </Form.Select>
//                     </Form.Group>
//                   </Col> */}
//                 </Row>
//                 {/* <Row className="my-3">
//                   <Col lg="2" md="12">
//                     <Form.Group className="">
//                       <Form.Select id="#">
//                         <option>Bulk Actions</option>
//                         <option>select2</option>
//                         <option>select3</option>
//                       </Form.Select>
//                     </Form.Group>
//                   </Col>
//                   <Col
//                     lg="4"
//                     md="12"
//                     className="d-flex align-items-center select-item"
//                   >
//                     <Button variant="dark" size="sm" className="px-3 dark-btn">
//                       Apply to Selected
//                     </Button>
//                     <p className="mb-0">1 item selected</p>
//                     <a href="#">Deselect all</a>
//                   </Col>
//                   <Col xs lg="2" md="12"></Col>
//                 </Row> */}
//               </Col>
//             </Row>
//           </div>
//           <div>
//             <Row className="mt-3">
//               <Col lg="12" md="12">
//                 <div className="userbox position-relative retailer-table">
//                   <BootstrapTable
//                     condensed
//                     hover
//                     keyField="id"
//                     responsive={true}
//                     bordered={true}
//                     data={retailersInfo?.data?.user || []}
//                     columns={columns}
//                     // selectRow={ { mode: 'checkbox', clickToSelect: true } }
//                     pagination={paginationFactory({
//                       sizePerPage: 10,
//                       // totalSize: 50,
//                       totalSize: retailersInfo?.data?.count || 0,
//                       page: page,
//                       onPageChange: (page, sizePerPage) => {
//                         setPage(page);
//                         sizePerPage(page);
//                       },
//                       onSizePerPageChange: (sizePerPage) => {
//                         sizePerPage(page);
//                       },
//                     })}
//                   />
//                 </div>
//               </Col>
//             </Row>
//             <Modal show={updateRetailerModal} onHide={updateRetailerModalBtn}>
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
//                 <Select
//                   value={selectedOption}
//                   onChange={handleChange}
//                   options={statusOptions}
//                 />
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
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Retailers;
