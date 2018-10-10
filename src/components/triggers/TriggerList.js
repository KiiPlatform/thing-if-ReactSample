import React from 'react'
import {
  Datagrid,
  List,
  TextField,
  BooleanField,
  EditButton,
  DeleteButton,
} from 'react-admin'
import SimplePagination from '../common/SimplePagination'

const TriggerList = ({ classes, ...props }) => (
  <List
    {...props}
    bulkActionButtons={false}
    pagination={<SimplePagination/>}
  >
    <Datagrid>
      <TextField source="title" sortable= {false} />
      <TextField source="triggersWhat" sortable= {false} />
      <TextField label='Triggers when' source="predicate.triggersWhen" sortable= {false} />
      <TextField source="id" sortable= {false} />
      <BooleanField source="disabled" sortable= {false} />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
)

export default TriggerList
