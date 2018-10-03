
import React from 'react'
import {
  Create,
  TextInput,
  ListButton,
  SimpleForm,
  ArrayInput,
  SimpleFormIterator,
} from 'react-admin'

import CardActions from '@material-ui/core/CardActions'
import ActionSelector from './ActionSelector'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

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
  <Create actions= {<CommandDetailShowActions/> } {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <MuiThemeProvider>
        <ArrayInput source="actions">
          <SimpleFormIterator>
            <ActionSelector />
          </SimpleFormIterator>
        </ArrayInput>
      </MuiThemeProvider>

    </SimpleForm>
  </Create>
)

export default CommandDetail
