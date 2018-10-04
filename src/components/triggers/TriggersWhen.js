import React, { Component } from 'react'
import {
  RadioButtonGroupInput,
  DateInput,
} from 'react-admin'
import { connect } from 'react-redux'
import ClauseSelector from './ClauseSelector'

class TriggersWhenComponent extends Component {
  state = {
    eventSource: this.props.selectedEventSource
  }
  handleEventSourceChange = (_, selectedValue) => {
    this.setState({
      eventSource: selectedValue
    })
  }
  renderContent = () => {
    if (this.state.eventSource === 'ScheduleOnce') {
      return (<div><DateInput source='scheduleAt'/></div>)
    } else if (this.state.eventSource === 'States') {
      return (<div>
        <div>
          <RadioButtonGroupInput
            source="triggersWhen"
            choices={[
              { id: 'ConditionTrue', name: 'ConditionTrue' },
              { id: 'ConditionFalseToTrue', name: 'ConditionFalseToTrue' },
              { id: 'ConditionChanged', name: 'ConditionChanged' },
            ]}
          />
        </div>
        <div>
          <ClauseSelector source='clause'/>
        </div>
      </div>)
    }
  }
  render () {
    return (
      <div>
        <RadioButtonGroupInput
          source="eventSource"
          choices={[
            { id: 'States', name: 'States' },
            { id: 'ScheduleOnce', name: 'ScheduleOnce' },
          ]}
          onChange={this.handleEventSourceChange}
        />
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedEventSource: state.form['record-form'].values.eventSource,
  }
}
export default connect(mapStateToProps)(TriggersWhenComponent)
