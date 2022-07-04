

import React, { useEffect,useState } from "react"
import { Card, CardBody, Container, Modal, ModalHeader, ModalBody } from "reactstrap"
import MetaTags from 'react-meta-tags';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { useDispatch, useSelector } from "react-redux";

import { getadvertisment } from "../../store/Addvertisment/actions";
import BootstrapTable from "react-bootstrap-table-next";
import Form from "react-bootstrap/Form";
import Switch from "react-switch";
import { FiUserPlus } from "react-icons/fi";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import {  AiOutlineClose } from "react-icons/ai";
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
import avatar from "../../assets/images/users/avatar-1.jpg"
import paginationFactory from "react-bootstrap-table2-paginator";
import { useHistory,useLocation } from "react-router-dom";
import { getAdvertisementStatus } from "store/actions";
const Advertisment = () => {
 
  const auth = useSelector(state=>state?.advertisment);
  const dispatch = useDispatch();
  const authToken = auth?.data?.token;
  const advertisementData = useSelector(state=>state?.getAdvertisement);

  const advertisementValues=advertisementData?.Advertisement?.advertisement;
  console.log("3231",advertisementValues)
  const [searchAdvertisements, setSearchAdvertisements] = useState("");
  const [deleteAdModal, setdeleteAdModal] = useState(false)
  const [adID, setAdID] = useState("");
const history = useHistory()
const location = useLocation()
  
const handleOnUserSearch = (e)=>{
    setSearchAdvertisements(e.target.value)
  }
  const addUser = () => {
    history.push("/add-advertisements");
  };

  const columns = [
    // {
    //   dataField: "image",
    //   sort: true,
    //   formatter: (col, row) => {
    //     if (col) return <img alt="" src={col} />;
    //     else {
    //       return <img alt="" 
    //       src={avatar}
    //        />;
    //     }
    //   },
    // },

    {
      dataField: "name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "description",
      text: "Description",
      sort: true,
      headerStyle: (colum, colIndex) => ({ width: '40%', textAlign: 'left' }),
    },
    {
      dataField: "link",
      text: "Link",
    },

    {
      dataField: "",
      text: "Action",
      sort: false,
      
      formatter: (col, row) => {
        return (
          <>
            <a className="edit-use  " style={{fontSize:25}} >
              <FaRegEdit onClick={() => updateAds(row)} />
            </a>

            <a className="edit-use" style={{fontSize:25}}>
              <FaTrash onClick={() => deleteAdvertisement(row?._id)} />
            </a>
            <a className="edit-use" style={{fontSize:25}}>
              <FaTrash onClick={() => advertisementDelete(row?._id)} />
            </a>
          </>
        );
      },
    },
  ];
  const advertisementDelete = ()=>{
    console.log('button clicked');
  }
 
  // const updateAds=(row)=>{
  //   history.push({
  //     pathname:"/update-advertisement",
  //     state: {...row, },
  //   });
  // }
  const updateAds = (row) => {
    history.push({
      pathname: "/update-advertisement",
      state: { ...row, },
    });
  };
  let  post= { ad_id: adID }
  const deleteAd = async (e) => {
    e.preventDefault();
    await dispatch(
      getAdvertisementStatus(post)
    );
  }

  let postData= {
    searchParam: searchAdvertisements,
    sort: -1,
    pageNumber: 1,
    recordsLimit: 10,
  };
  useEffect(()=>{
    dispatch(getadvertisment(postData))
  },[searchAdvertisements])

  const deleteAdvertisement = (row) => {
    console.log("advertisement row data",row)
    setAdID(row)
    setdeleteAdModal(deleteAdModal ? false : true);

  };
  return (
    <React.Fragment>
      <div className="page-content">
          <MetaTags>
            <title>Advertisements | Skote - React Admin & Dashboard Template</title>
       </MetaTags>
     
       <div className="dashboard-right">
          <div className="d-flex align-items-center mt-2">
            <h2 className="dashboard-heading">Advertisements</h2>
            <Button onClick={addUser} className="brown-btn ms-4">
              <FiUserPlus className="me-2" />
              Add New Advertisement
            </Button>
          </div>
          <div className="user-box mt-3">
            <Row>
              <Col lg="12" md="12">
                <Row>
                  <Col lg="3" md="12">
                    <Form.Group
                      className="mb-3 position-relative searchbox"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Search</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Search"
                        name="search"
                        value={searchAdvertisements}
                        onChange={(e) => {
                          handleOnUserSearch(e, "search");
                        }}
                      />
                      <Form.Text className="text-muted"></Form.Text>
                      {/* <AiOutlineSearch className="position-absolute search-icon" /> */}
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <div>
            <Row className="mt-3">
              <Col lg="12" md="12">
                <div className="userbox position-relative add-newuser advers-table">
                  <BootstrapTable
                    condensed
                    hover
                    keyField="id"
                    responsive={true}
                    bordered={true}
                    data={advertisementValues || []}
                    columns={columns}
                    pagination={paginationFactory({ sizePerPage: 10 })}
                  />
                </div>
              </Col>
            </Row>
          </div>

{/* modal code start */}



{/* modal code end */}


         <Modal className="menumodal py-5" show={deleteAdModal}>
              <div className="w-100 d-flex justify-content-end">
                <span
                  className="px-2 py-2 fw-bold me-2 mt-2 cross-btn"
                  onClick={deleteAdvertisement}
                >
                  <AiOutlineClose />
                </span>
              </div>
              <ModalHeader className="d-flex justify-content-center align-items-center border-0 pb-0 mt-3">
                <h4 className="text-center fw-bold">
                  Are you sure you want to delete this Advertisement
                </h4>
              </ModalHeader>
              <ModalBody className="pt-3 pb-5">
                <div className="row">
                  <div className="col-md-12 d-flex justify-content-center">
                    <Button className="d-inflex-flex justify-content-center green-btn border-0 align-items-center px-5 mx-1"
                     onClick={deleteAd}
                     >
                     Yes
                    </Button>
                    <Button className="d-inflex-flex justify-content-center green-btn border-0 align-items-center px-5 mx-1"  
                    onClick={deleteAdvertisement}
                    >
                    No
                    </Button>
                  </div>
                </div>
              </ModalBody>
            </Modal>
        </div>
      </div>
    </React.Fragment>
  )
}
export default Advertisment





// import React, { useEffect, useState } from "react";
// import { Form, Button, Row, Col,  Modal, ModalHeader, ModalBody} from "react-bootstrap";

// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";

// import { AiOutlineSearch } from "react-icons/ai";
// import { FiUserPlus } from "react-icons/fi";
// import { FaRegEdit, FaTrash } from "react-icons/fa";
// import { ImCancelCircle } from "react-icons/im";
// import BootstrapTable from "react-bootstrap-table-next";
// import paginationFactory from "react-bootstrap-table2-paginator";
// import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
// import { useParams } from "react-router-dom";
// import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
// import {  AiOutlineClose } from "react-icons/ai";
// import { getAddvertisment } from "helpers/fakebackend_helper";

// const Advertisements = () => {
//   const auth = useSelector(state => state.Login?.userDetails);
//   console.log("auth data get", auth)
//   const authToken = auth?.data?.token
//   console.log("auth data get", authToken)
//   const dispatch = useDispatch();

//   const advertisementDataInfo = useSelector(state=>state?.addvertismentlist);
//   console.log("advertisementDataInfo0",advertisementDataInfo)
//   const [searchAdvertisements, setSearchAdvertisements] = useState("");
//   const [deleteAdModal, setdeleteAdModal] = useState(false)
//   const [adID, setAdID] = useState("");

//   let history = useHistory();
//   const [formState, setFormState] = useState({
//     errors: {},
//   });
//   const addUser = () => {
//     history.push("/add-advertisements");
//   };

//   const columns = [
//     {
//       dataField: "image",
//       sort: true,
//       formatter: (col, row) => {
//         if (col) return <img alt="" src={col} />;
//         else {
//           return <img alt="" src={avtar} />;
//         }
//       },
//     },

//     {
//       dataField: "name",
//       text: "Name",
//       sort: true,
//     },
//     {
//       dataField: "description",
//       text: "Description",
//       sort: true,
//     },
//     {
//       dataField: "link",
//       text: "Link",
//     },

//     {
//       dataField: "",
//       text: "Action",
//       sort: false,
//       // headerStyle: (colum, colIndex) => ({ width: '10%', textAlign: 'left' }),
//       formatter: (col, row) => {
//         return (
//           <>
//             <a className="edit-use">
//               <FaRegEdit onClick={() => updateAds(row)} />
//             </a>

//             <a className="edit-use ms-4">
            
//               <FaTrash onClick={() => deleteAdvertisement(row?._id)} />
//             </a>
//           </>
//         );
//       },
//     },
    
//   ];

  
//   const updateAds=(row)=>{
//     history.push({
//       pathname: "/edit-advertisements",
//            state: {
//         row,
//       },
//     });
//   }

//   const deleteAdvertisement = (row) => {
//     setAdID(row)
//     setdeleteAdModal(deleteAdModal ? false : true);
//   };
//   const handleOnUserSearch = (e) => {
//     setSearchAdvertisements(e.target.value);
//   };
//   useEffect(() => {
 
//       dispatch(
//         getAddvertisment({
//           postData: {
//             searchParam: searchAdvertisements,
//             sort: -1,
//             pageNumber: 1,
//             recordsLimit: 10,
//           },
//           authToken,
//         })
//       );

//   },[searchAdvertisements]);

// return(
//   <>
  
//   </>
// )
// }

// export default Advertisements



