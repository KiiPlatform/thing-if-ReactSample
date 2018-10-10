import React, { Component } from 'react'
import {
  RadioButtonGroupInput,
  DateInput,
} from 'react-admin'
import ClauseSelector from './ClauseSelector'
import { TriggersWhen } from 'thing-if'

class TriggersWhenComponent extends Component {
  state = {
    eventSource: this.props.selectedEventSource ||
      (this.props.record ? this.props.record.eventSource : 'States')
  }
  handleEventSourceChange = (_, selectedValue) => {
    this.setState({
      eventSource: selectedValue
    })
  }
  renderContent = () => {
    if (this.state.eventSource === 'ScheduleOnce') {
      return (<div><DateInput source='predicate.scheduleAt'/></div>)
    } else if (this.state.eventSource === 'States') {
      return (<div>
        <div>
          <RadioButtonGroupInput
            source="predicate.triggersWhen"
            choices={[
              {
                id: TriggersWhen.CONDITION_TRUE,
                name: 'ConditionTrue',
                value: TriggersWhen.CONDITION_TRUE,
              },
              {
                id: TriggersWhen.CONDITION_FALSE_TO_TRUE,
                name: 'ConditionFalseToTrue',
                value: TriggersWhen.CONDITION_FALSE_TO_TRUE,
              },
              {
                id: TriggersWhen.CONDITION_CHANGED,
                name: 'ConditionChanged',
                value: TriggersWhen.CONDITION_CHANGED,
              },
            ]}
            optionText='name'
            optionValue='value'
          />
        </div>
        <div>
          <ClauseSelector
            source='predicate.condition.uiClause'
            {...this.props}
          />
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

export default TriggersWhenComponent
