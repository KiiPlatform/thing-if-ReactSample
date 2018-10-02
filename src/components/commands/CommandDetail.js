import React from 'react'
import { Show, SimpleShowLayout, TextField, DateField, Datagrid, ArrayField, BooleanField } from 'react-admin'

const CommandDetail = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="title" />
      <ArrayField source="simplyfiedActions">
        <Datagrid>
          <TextField source='alias'/>
          <TextField source='actionName'/>
          <BooleanField source='actionValue'/>
        </Datagrid>
      </ArrayField>
      <DateField label="Created date" source="created" showTime />
      <DateField label="Modified date" source="modified" showTime />
    </SimpleShowLayout>
  </Show>
)

export default CommandDetail
