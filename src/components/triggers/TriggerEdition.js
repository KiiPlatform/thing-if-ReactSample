
import React, { Component } from 'react'
import {
  Edit,
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
class TriggerEdition extends Component {
  render () {
    return (<Edit actions= {<Actions/> } {...this.props}>
      <TabbedForm redirect='list'>
        <FormTab label='summary'>
          <TextInput source="title" />
          <TextInput source='description' />
        </FormTab>
        <FormTab label='triggers what'>
          <TriggersWhatComponent {...this.props}/>
        </FormTab>
        <FormTab label='triggers when'>
          <TriggersWhenComponent {...this.props}/>
        </FormTab>
      </TabbedForm>
    </Edit>)
  }
}

export default TriggerEdition
