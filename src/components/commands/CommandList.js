import React from 'react'
import {
  Datagrid,
  List,
  TextField,
  DateField,
  ShowButton,
  Pagination,
} from 'react-admin'

const SimplePagination = (props) => {
  return (<Pagination {...props} rowsPerPageOptions={[]} />)
}

const CommandList = ({ classes, ...props }) => (
  <List
    {...props}
    bulkActionButtons={false}
    pagination={<SimplePagination/>}
  >
    <Datagrid>
      <TextField source="id" sortable= {false} />
      <TextField source="title" sortable= {false} />
      <TextField source="commandState" sortable= {false} />
      <DateField source="created" showTime sortable= {false} />
      <DateField source="modified" showTime sortable= {false} />
      <ShowButton />
    </Datagrid>
  </List>
)

export default CommandList
