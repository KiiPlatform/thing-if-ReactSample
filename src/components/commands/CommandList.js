import React from 'react'
import {
  Datagrid,
  List,
  TextField,
  DateField,
  ShowButton,
} from 'react-admin'

const CommandList = ({ classes, ...props }) => (
  <List
    {...props}
    sort={{ field: 'id', order: 'DESC' }}
  >
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="commandState" />
      <DateField source="created" showTime />
      <DateField source="modified" showTime />
      <ShowButton />
    </Datagrid>
  </List>
)

export default CommandList