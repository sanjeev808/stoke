import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { withRouter, Link } from "react-router-dom"
import BootstrapTable from "react-bootstrap-table-next"
import { getlatestusers } from "store/actions"
import EcommerceOrdersModal from "../Ecommerce/EcommerceOrders/EcommerceOrdersModal"

//redux
import { useSelector, useDispatch } from "react-redux"

const auth = JSON.parse(localStorage.getItem('authUser'));

const authToken = auth?.data?.token
console.log('auth data',authToken)

const LatestTranaction = props => {
  const dispatch = useDispatch()
  const orders = useSelector(state => state?.latestUserList)
  useEffect(() => {
    if(authToken)
    {
      dispatch(getlatestusers(authToken))
    }
    
  
  }, [dispatch ,authToken]);
  const columns = [

    {
      dataField: "firstname",

      formatter: (col, row) => {
        if (col) return col + " " + row.lastname;
      },
      text: "First Name",
      sort: true,
      // headerStyle: (colum, colIndex) => ({ width: '50px', textAlign: 'center' })
    },
    {
      dataField: "lastname",
      // formatter: (col, row) => {
      //   if (col) return col + " " + row.lastname;
      // },
      text: "Last Name",
      sort: true,
      // headerStyle: (colum, colIndex) => ({ width: '50px', textAlign: 'center' })
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
    },
  ]

  return (
    <React.Fragment>
      <EcommerceOrdersModal
      //  isOpen={modal1}
      // toggle={toggleViewModal} 
      />
      <BootstrapTable
        condensed
        hover
        keyField="id"
        responsive={true}
        bordered={true}
        data={orders?.Latestusers?.user || []}
        columns={columns}
      ></BootstrapTable>

      <Link to='/user' className="d-flex justify-content-center"><button className="btn btn-primary  btn-sm py-2 px-2">View All User</button></Link>
    </React.Fragment>
  )
}

LatestTranaction.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
}

export default withRouter(LatestTranaction)