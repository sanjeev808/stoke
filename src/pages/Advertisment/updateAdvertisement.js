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
import { useHistory } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";

// import {
//   selectAuth,
// } from "../../auth/authSlice";
import {updateAdvertisement} from 'store/updateAdvertisement/actions'
// import {updateAdvertisementsAsync , getAdvertisementListAsync } from "../../reducers/advertisementReducer";

const UpdateAdvertisement = (props) => {
    // const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  // const authToken = auth?.data?.token;
  let history = useHistory();
  const [link, setLink] = useState("");
  const [titlename, setTitleName] = useState("");
  const [description, setDescription] = useState("");
  const hiddenFileInput = React.useRef(null);
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [adID, setAdID] = useState("");
  const [adImage,setAdImage]=useState("")

  const [formState, setFormState] = useState({
    errors: {},
  });

  useEffect(() => {
    let row = props;
    let rowData= row?.location?.state
    console.log("row",row?.location?.state)
        setAdID(rowData?._id);
      setTitleName(rowData?.name);
      setDescription(rowData?.description);
      setLink(rowData?.link);
      setAdImage(rowData.image);
     
    
  }, []);

  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;
    // if (!titlename.match(/^[A-Za-z]*$/)) {
    //   formIsValid = false;
    //   errors["titlename"] =
    //     "title cannot contain numbers and special characters and Spaces";
    // }
    if (!titlename) {
      formIsValid = false;
      errors["titlename"] = "Title is Required*";
    }
    if (!description) {
      formIsValid = false;
      errors["description"] = "Description is Required*";
    }
    // if (!imgData) {
    //   formIsValid = false;
    //   errors["imgData"] = "Image is Required*";
    // }
    setFormState({ errors: errors });
    return formIsValid;
  };

  const updateAdvertisementData = {
    ad_id: adID,
    link: link,
    name: titlename,
    description: description,
    image: imgData || adImage,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {

    dispatch(updateAdvertisement(updateAdvertisementData));
    history.push("/advertisment")  
  }
  };
  const handleCancel = () => {
    history.push("/view-all-advertisment");
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
   
  };

  const handleClick = () => {
    if (hiddenFileInput) {updateAdvertisementsAsync
      hiddenFileInput.current.click();
    }
  };


  return (
    <div>     
      <section className="main-dashboard position-relative" style={{ marginTop: 74, marginLeft: 15 }}>
     

        <div className="dashboard-right">
          <h2 className="dashboard-heading">Update Advertisements</h2>
      
          <Row>
            <Col lg="10" md="12">
              <div className="user-detailbox w-100">
                <Row>
                  <Col lg="8" md="12">
                    <Row>
                      <Col lg="6" md="12">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Title<span className="colored">*</span></Form.Label>
                          <Form.Control
                            type="text"
                            maxLength={20}
                            placeholder="Enter Title"
                            value={titlename}
                            onChange={(e) => setTitleName(e.target.value)}
                          />
                          <span className="error-msg" style={{ color: "red" }}>
                            {formState?.errors["titlename"]}
                          </span>
                        </Form.Group>
                      </Col>
                      <Col lg="6" md="12">
                      <Form.Group
                          className="mb-3"
                          controlId="formBasicEmail1"
                        >
                          <Form.Label>Link</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Link"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                          />
                          <span className="error-msg" style={{ color: "red" }}>
                            {formState?.errors["link"]}
                          </span>
                        </Form.Group>
                      </Col>
                      <Col lg="12" md="12">
                      <Form.Group
                          className="mb-3 d-flex flex-column ad-textarea mt-3"
                          controlId="formBasicEmail2"
                        >
                          <Form.Label>Description<span className="colored">*</span></Form.Label>

                          <textarea
                            maxLength={500}
                            placeholder="Enter Description"
                            value={description}
                            className="p-2"
                            onChange={(e) => setDescription(e.target.value)}
                          />

                          <span className="error-msg" style={{ color: "red" }}>
                            {formState?.errors["description"]}
                          </span>
                        </Form.Group>
                      </Col>
                                        
                    </Row>
                  </Col>
                  <Col lg="4">
                    <div className="my-3 user-picsec d-flex flex-column align-items-center">
                      <div className="position-relative userimg-editicon advertisment-img d-flex flex-column">
                        <label>Add Image<span className="colored">*</span></label>
                        <img
                          src={imgData || adImage }
                          className="img-fluid singleuserimage mt-3 border-0"
                          alt=""
                        />
                        <a>
                          <FaRegEdit onClick={handleClick} />
                        </a>
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
                  <Button className="brown-btn me-3" onClick={handleSubmit}>
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
        
        </div>
      </section>
    </div>
  );
};

export default UpdateAdvertisement;




















// import React, { useEffect } from "react";
// import PropTypes from "prop-types"
// import { useState } from "react";
// import {
//   Form,
//   Button,
//   Dropdown,
//   Accordion,
//   Row,
//   Col,
//   Table,
//   Figure,
//   Modal,
// } from "react-bootstrap";
// import addimg from "../../assets/images/users/galleryimg.png"
// import { useDispatch, useSelector } from "react-redux";
// import moment from "moment";
// import { useHistory } from "react-router-dom";
// import { FaRegEdit } from "react-icons/fa";
// import {updateAdvertisement} from 'store/updateAdvertisement/actions'

// const updateadvertisement = (props) => {


//   const dispatch = useDispatch(); 
//     const  history = useHistory();
//   const [linkdata, setLinkData] = useState("");
//   const [titlename, setTitleName] = useState("");
//   const [description, setDescription] = useState("");
//   const hiddenFileInput = React.useRef(null);
//   const [picture, setPicture] = useState(null);
//   const [imgData, setImgData] = useState(null);
//   const [formState, setFormState] = useState({
//     errors: {},
//   });
//   const [adID, setadID] = useState("");
//   const updateAdvertisementData = {
//     ad_id: adID,
//     link: linkdata,
//     name: titlename,
//     description: description,
//     image: imgData
//   };
//   console.log("add data", updateAdvertisementData)
//   const handleValidation = () => {
//     let errors = {};
//     let formIsValid = true;
 
//     if (!titlename) {
//       formIsValid = false;
//       errors["titlename"] = "Title is Required*";
//     }
//     if (!description) {
//       formIsValid = false;
//       errors["description"] = "Description is Required*";
//     }
//     if (!imgData) {
//       formIsValid = false;
//       errors["imgData"] = "Image is Required*";
//     }
//     setFormState({ errors: errors });
//     return formIsValid;
//   };

//   const handleSubmit = (e) => {
//   console.log("button clicked")
//     e.preventDefault();
//     if (handleValidation()) {
//       dispatch(
//         updateAdvertisement({  
//           postData: updateAdvertisementData,
//           history,})
//       );
//     }
//   };
//   const handleCancel = () => {
//     history.push("/advertisment");
//   };

//   const onChangePicture = (e) => {
//     if (e.target.files[0]) {
//       setPicture(e.target.files[0]);
//       const reader = new FileReader();
//       if (
//         e.target.files[0].type === "image/jpeg" ||
//         e.target.files[0].type === "image/png" ||
//         e.target.files[0].type === "image/jpg"
//       ) {
//         if (e.target.files[0].size <= 1000000) {
//           reader.addEventListener("load", () => {
//             setImgData(reader.result);
//           });
//         } else {
//           toast.error("File size should be less than 1 MB.");
//         }
//       } else {
//         toast.error("file not supported");
//       }

//       reader.readAsDataURL(e.target.files[0]);
//     }
//   };
//   const handleClick = () => {
//     if (hiddenFileInput) {
//       hiddenFileInput.current.click();
//     }
//   };
//   useEffect(()=>{
//     const row = props
//     let rowdata = row?.location?.state
//     console.log("row",rowdata)
//     setadID(rowdata?._id)
//     setLinkData(rowdata?.link)
//     setTitleName(rowdata?.name)
//     setDescription(rowdata?.description)
//     setImgData(rowdata?.image)
//   })


//   return(
//     <div>
//     <section className="main-dashboard position-relative" style={{ marginTop: 74, marginLeft: 15 }}>
//       <div className="dashboard-right">
//         <h2 className="dashboard-heading">Advertisement</h2>

//         <Row>
//           <Col lg="10" md="12">
//             <div className="user-detailbox w-100">
//               <Row>
//                 <Col lg="8" md="12">
//                   <Row>
//                     <Col lg="6" md="12">
//                       <Form.Group className="mb-3" controlId="formBasicEmail">
//                         <Form.Label>Title</Form.Label>
//                         <Form.Control
//                           type="text"
//                           // maxLength={20}
//                           placeholder="Enter Title"
//                           name="titlename"
//                           value={titlename}
//                           onChange={(e) => setTitleName(e.target.value)}
//                         />
//                         <span className="error-msg" style={{ color: "red" }}>
//                           {formState?.errors["titlename"]}
//                         </span>
//                       </Form.Group>
//                     </Col>
//                     <Col lg="6" md="12">
//                       <Form.Group
//                         className="mb-3"
//                         controlId="formBasicEmail1"
//                       >
//                         <Form.Label>Link</Form.Label>
//                         <Form.Control
//                           type="text"
//                           placeholder="Enter Link"
//                           value={linkdata}
//                           onChange={(e) => setLinkData(e.target.value)}
//                         />
//                         <span className="error-msg" style={{ color: "red" }}>
//                           {formState?.errors["link"]}
//                         </span>
//                       </Form.Group>
//                     </Col>
//                     <Col lg="12" md="12">
//                       <Form.Group
//                         className="mb-3 d-flex flex-column ad-textarea mt-3"
//                         controlId="formBasicEmail2"
//                       >
//                         <Form.Label className="mb-2">Description</Form.Label>

//                         <textarea
//                           maxLength={1000}
//                           placeholder="Enter Description"
//                           value={description}
//                           className="p-3"
//                           onChange={(e) => setDescription(e.target.value)}
//                         />

//                         <span className="error-msg" style={{ color: "red" }}>
//                           {formState?.errors["description"]}
//                         </span>
//                       </Form.Group>
//                     </Col>
//                   </Row>
//                 </Col>
//                 <Col lg="4" md="12">
//                   <div>
//                     <span className="single-userimg d-flex flex-column align-items-center">
//                       <span className="profile-imguser d-flex flex-column align-items-center">
//                         <div className="position-relative userimg-editicon mt-3 advertisment-img">
//                           <img
//                             src={imgData || addimg}
//                             className="img-fluid singleuserimage mt-3 border-0 rounded-0"
//                             alt=""
//                           />
//                           <a>
//                             <FaRegEdit onClick={handleClick} />{" "}
//                           </a>
//                           <input
//                             id="profilePic"
//                             type="file"
//                             ref={hiddenFileInput}
//                             style={{ display: "none" }}
//                             onChange={onChangePicture}
//                           />
                          
//                         </div>
//                       </span>
//                       <span className="error-msg" style={{ color: "red" }}>
//                           {formState?.errors["imgData"]}
//                         </span>
//                     </span>
//                   </div>
//                 </Col>
//               </Row>
//               <div className="savechanges-btn d-flex">
//                 <Button className="brown-btn me-3" onClick={handleSubmit}>
//                   Save
//                 </Button>
//                 <Button
//                   className="brown-btn d-block gray-btn"
//                   onClick={handleCancel}
//                 >
//                   Cancel
//                 </Button>
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </div>
//     </section>
//   </div>
//   )
// }
// export default updateadvertisement;
