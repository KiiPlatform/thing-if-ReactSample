
import React from 'react'
import {
  Create,
  TextInput,
  ListButton,
  TabbedForm,
  FormTab,
} from 'react-admin'

import CardActions from '@material-ui/core/CardActions'
import TriggersWhatComponent from './TriggersWhat'
import TriggersWhenComponent from './TriggersWhen'
const cardActionStyle = {
  zIndex: 2,
  display: 'inline-block',
  float: 'right',
}

const Actions = ({ basePath, data, resource }) => (
  <CardActions style={cardActionStyle}>
    <ListButton basePath={basePath} record={data} />
  </CardActions>
)
const TriggerCreation = (props) => (
  <Create actions= {<Actions/> } {...props}>
    <TabbedForm redirect='show'>
      <FormTab label='summary'>
        <TextInput source="title" />
        <TextInput source='description' />
      </FormTab>
      <FormTab label='triggers what'>
        <TriggersWhatComponent />
      </FormTab>
      <FormTab label='triggers when'>
        <TriggersWhenComponent/>
      </FormTab>
    </TabbedForm>
  </Create>
)

export default TriggerCreation
