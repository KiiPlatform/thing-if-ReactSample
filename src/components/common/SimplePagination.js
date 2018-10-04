import React from 'react'
import { Pagination } from 'react-admin'

const SimplePagination = (props) => {
  return (<Pagination {...props} rowsPerPageOptions={[]} />)
}

export default SimplePagination
