import React from 'react'
import {
  Datagrid,
  List,
  TextField,
} from 'react-admin'

const CommandList = ({ classes, ...props }) => (
  <List
    {...props}
    sort={{ field: 'id', order: 'DESC' }}
  >
    <Datagrid>
      <TextField source="id" />
    </Datagrid>
  </List>
)

export default CommandList
