import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { withRouter, Link } from "react-router-dom"
import BootstrapTable from "react-bootstrap-table-next"
import { getlatestusers } from "store/actions"
import EcommerceOrdersModal from "../Ecommerce/EcommerceOrders/EcommerceOrdersModal"

//redux
import { useSelector, useDispatch } from "react-redux"

const LatestTranaction = props => {
  const dispatch = useDispatch()
  const orders = useSelector(state => state?.latestUserList)
  useEffect(() => {
    dispatch(getlatestusers())
  
  }, []);
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

      <Link to='/user' className="btn-primary p-2 brown-btn ms-4">View All User</Link>
    </React.Fragment>
  )
}

LatestTranaction.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
}

export default withRouter(LatestTranaction)