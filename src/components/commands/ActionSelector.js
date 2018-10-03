import React, { Component } from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { getActions } from '../../common/AirConditioner'
import {
  TextInput,
  SelectInput,
  NumberInput,
} from 'react-admin'

const actions = getActions() || {}
const actionNames = Object.keys(actions)

class ActionInput extends React.Component {
  render () {
    const { actionName, source } = this.props
    const payloadSchema = actions[actionName].payloadSchema
    const commonProps = {
      source: source,
      label: 'value'
    }
    if (payloadSchema.type === 'string') {
      if (payloadSchema.enum) {
        return (<SelectInput
          {...commonProps}
          choices={
            payloadSchema.enum.map((value, index) => {
              return {
                id: index,
                name: value,
              }
            })
          }
        />)
      } else {
        return (<TextInput {...commonProps} />)
      }
    } else if (payloadSchema.type === 'integer') {
      return (<NumberInput
        {...commonProps}
        inputProps={{
          step: 1,
          min: payloadSchema.maximum,
          max: payloadSchema.minimum,
        }}
      />)
    } else if (payloadSchema.type === 'number') {
      return (<NumberInput {...commonProps} />)
    } else {
      return null
    }
  }
}

export default class ActionSelector extends Component {
  state = {
    action: actionNames[0]
  }

  handleChange = (event, index, action) => {
    this.setState({ action })
  }
  render () {
    return (
      <div>
        <div>
          <SelectField
            floatingLabelText='Action'
            value={this.state.action}
            onChange={this.handleChange}
          >
            {actionNames.map((actionName, index) => {
              return (
                <MenuItem key={index} value={actionName} primaryText={actionName} />
              )
            })}
          </SelectField>
        </div>
        <div>
          <ActionInput
            source={this.props.source}
            actionName={this.state.action}
          />
        </div>
      </div>
    )
  }
}
