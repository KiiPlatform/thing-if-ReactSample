
import React, { Component } from 'react'
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
import { connect } from 'react-redux'
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

class TriggerCreation extends Component {
  render () {
    const { savedValues } = this.props
    return (<Create actions= {<Actions/> } {...this.props}>
      <TabbedForm redirect='list'>
        <FormTab label='summary'>
          <TextInput source="title" />
          <TextInput source='description' />
        </FormTab>
        <FormTab label='triggers what'>
          <TriggersWhatComponent
            selectedTriggersWhat={ savedValues ? savedValues.triggersWhat : {}}
            {...this.props}
          />
        </FormTab>
        <FormTab label='triggers when'>
          <TriggersWhenComponent
            selectedEventSource= { savedValues ? savedValues.eventSource : {}}
            {...this.props}
          />
        </FormTab>
      </TabbedForm>
    </Create>
    )
  }
}
const mapStateToProps = (state) => {
  if (!state.form['record-form'] || !state.form['record-form'].values) {
    return {}
  }
  return {
    savedValues: state.form['record-form'].values,
  }
}

export default connect(mapStateToProps)(TriggerCreation)
