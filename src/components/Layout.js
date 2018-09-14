import { Layout } from 'react-admin'
import React from 'react'
import Menu from './menu/Menu'

const AppLayout = (props) => {
  return (<Layout {...props} menu={Menu} />)
}

export default AppLayout
