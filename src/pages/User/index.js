
import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import PropTypes from "prop-types"
import { withRouter, Link } from "react-router-dom"
import { isEmpty, set } from "lodash"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import { Button, Card, CardBody, Col, Row, Badge } from "reactstrap"
import { getOrders as onGetOrders } from "store/actions"
import { getusers } from "store/actions"
import EcommerceOrdersModal from "../Ecommerce/EcommerceOrders/EcommerceOrdersModal"
import _ from 'lodash'
import Pagination from "./Pagination";

//paginate
import ReactPaginate from "react-paginate"
//redux
import { useSelector, useDispatch } from "react-redux"
import userProfile from "pages/Authentication/user-profile"

const user = props => {

  const [Datafilter, setDatafilter] = useState("");
  const [select, setSelect] = useState("")
  const [user, setUser] = useState
  const dispatch = useDispatch()
  const orders = useSelector(state => state?.Userlist)
  console.log("data", orders?.users?.user, "oo")
  useEffect(() => {
    dispatch(getusers())
    setItems(orders)
  }, [dispatch]);
  const [q, setQ] = useState("")
  const DataFilterArr = [];
  const dataOrder = orders?.users?.user

function DataSubmit(){
  // dataOrder?.filter((ele) => {
  //   if (q && select) {
  //     if (ele.firstname == q && ele.status == select) {
  //       DataFilterArr.push(ele)
  //       console.log(ele,"ll")
  //     }
  //   }
  //   if(q || select) {
  //     if (ele.status == select || ele.firstname == q) {
  //       DataFilterArr.push(ele)
  //     }
  //   }
  // })
  dataOrder?.filter((ele) => {
    if (q && select) {
      if (q == ele.firstname && select == ele.status) { 
        DataFilterArr.push(ele);
        console.log(DataFilterArr);
    }
  //   if (q == ele.firstname || select == ele.status) { 
  //     DataFilterArr.push(ele);
  //     console.log(DataFilterArr);
  }
    // if(select)
    // {
    //   if (ele.status == select  ) {
    //     DataFilterArr.push(ele)
    //     console.log(DataFilterArr,"ll")
    // }
    // }
  
  // }
  }
  )
}


function Onclick(e){
DataSubmit();
setDatafilter(DataFilterArr);
}

function handleSelectChange(e){
  setSelect(e.target.value)
  if(e.target.value=="select"){
    setSelect("")
  }
}

  function handleChange(e) {
    
    setQ(e.target.value)
  }
  console.log(DataFilterArr, "arr")
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

  // const handledata = (e) => {
  //   console.log(e.target.value)
  //   setQ(e.target.value)
  // }
  // const filterdata = () => {
  //   console.log(orders)
  // }

  const [showPerPage, setShowPerPage] = useState(4);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  console.log(q, "fff")
  return (
    <React.Fragment>
        <MetaTags>
            <title>User | Skote - React Admin & Dashboard Template</title>
          </MetaTags>
      <Card>
        <CardBody>

<div className="d-flex mt-3">
          <div className="mb-4 mt-5 ml-5 fs-3 h4 card-title">User</div>
          <div>
            <Link to="/user/add"><button className="mx-5 my-5 px-3 py-1 h4 card-title btn-primary text-light btn btn-primary  btn-sm ">Add User</button></Link>
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
                <button type="button" className="btn-primary mt-3 px-4 py-2 w-100 btn btn-primary  btn-sm" onClick={Onclick}>Filter</button>
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
              ) : orders?.users?.user?.slice(pagination.start, pagination.end).map((item, index) => {
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

          <Pagination 
          showPerPage={showPerPage}
          onPaginationChange={onPaginationChange}
          total={orders?.users?.user?.length}
        />

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

user.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
}

export default withRouter(user)
