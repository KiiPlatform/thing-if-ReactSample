import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  SelectInput,
  TextInput,
  NumberInput,
} from 'react-admin'
import { getActionDefinitions } from '../../common/AirConditioner'
import { accessAttributeByPath } from '../../common/utils'

const actionDefs = getActionDefinitions() || {}
const actionNames = Object.keys(actionDefs)

class ActionSelector extends Component {
  state = {}
  componentDidMount () {
    const { savedValues, source } = this.props
    this.setState({
      selectedAction: accessAttributeByPath(savedValues, source + '.actionName')
    })
  }
  renderValueField = () => {
    if (!this.state.selectedAction) {
      return
    }
    const { source } = this.props
    const payloadSchema = actionDefs[this.state.selectedAction].payloadSchema
    const commonProps = {
      label: 'value',
      source: source + '.actionValue',
    }
    if (payloadSchema.type === 'string') {
      if (payloadSchema.enum) {
        return (<SelectInput
          {...commonProps}
          choices={
            payloadSchema.enum.map((value) => {
              return {
                id: value,
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
  handleActionChange = (_, selectedAction) => {
    this.setState({ selectedAction })
  }
  render () {
    const { source } = this.props
    return (<div>
      <div>
        <SelectInput
          source={source + '.actionName'}
          label='action'
          choices={
            actionNames.map((value) => {
              return {
                id: value,
                name: value
              }
            })
          }
          onChange={this.handleActionChange}
        />
      </div>
      <div>
        {this.renderValueField()}
      </div>
    </div>)
  }
}

const mapStateToProps = (state) => {
  return {
    savedValues: state.form['record-form'] ? state.form['record-form'].values : null
  }
}
export default connect(mapStateToProps)(ActionSelector)
