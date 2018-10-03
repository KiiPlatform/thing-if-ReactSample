import React from 'react'
import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  Datagrid,
  ArrayField,
  BooleanField,
  ListButton
} from 'react-admin'

import CardActions from '@material-ui/core/CardActions'

const cardActionStyle = {
  zIndex: 2,
  display: 'inline-block',
  float: 'right',
}

const CommandDetailShowActions = ({ basePath, data, resource }) => (
  <CardActions style={cardActionStyle}>
    <ListButton basePath={basePath} record={data} />
  </CardActions>
)
const CommandDetail = (props) => (
  <Show actions= {<CommandDetailShowActions/> } {...props}>
    <SimpleShowLayout>
      <TextField source="title" />
      <ArrayField source="simplyfiedActions">
        <Datagrid>
          <TextField source='alias'/>
          <TextField source='actionName'/>
          <TextField source='actionValue'/>
        </Datagrid>
      </ArrayField>
      <DateField label="Created date" source="created" showTime />
      <DateField label="Modified date" source="modified" showTime />
    </SimpleShowLayout>
  </Show>
)

export default CommandDetail
