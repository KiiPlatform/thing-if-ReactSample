import React from 'react'
import {
  Datagrid,
  List,
  TextField,
  DateField,
  ShowButton,
} from 'react-admin'
import SimplePagination from '../common/SimplePagination'

const TriggerList = ({ classes, ...props }) => (
  <List
    {...props}
    pagination={<SimplePagination/>}
  >
    <Datagrid>
      <TextField source="title" sortable= {false} />
      <TextField source="triggersWhat" sortable= {false} />
      <TextField source="eventSource" sortable= {false} />
      <TextField source="id" sortable= {false} />
      <TextField source="enabled" sortable= {false} />
      <DateField source="created" showTime sortable= {false} />
      <DateField source="modified" showTime sortable= {false} />
      <ShowButton />
    </Datagrid>
  </List>
)

export default TriggerList
