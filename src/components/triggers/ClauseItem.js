import React, { Component } from 'react'
import {
  SelectInput,
  TextInput,
  NumberInput,
} from 'react-admin'
import { getStateDefinitions } from '../../common/AirConditioner'
import { connect } from 'react-redux'
import { accessAttributeByPath } from '../../common/utils'

const stateDefs = getStateDefinitions()

class ClauseItem extends Component {
  state = {}
  componentDidMount () {
    const savedClause = accessAttributeByPath(this.props.savedFormValues, this.props.source)
    this.setState({
      selectedField: savedClause ? savedClause.field : null
    })
  }
  handleFieldChange = (_, selectedValue) => {
    this.setState({ selectedField: selectedValue })
  }
  renderValueInput = () => {
    if (!this.state.selectedField) {
      return
    }
    const { source, type } = this.props
    const stateSchema = stateDefs[this.state.selectedField].payloadSchema
    const commonProps = {
      label: 'value',
      source: source + '.value',
    }
    if (type === 'range') {

    } else if (type === 'equals' || type === 'notEquals') {
      if (stateSchema.type === 'string') {
        if (stateSchema.enum) {
          return (<SelectInput
            {...commonProps}
            choices={
              stateSchema.enum.map((value) => {
                return {
                  id: value,
                  name: value,
                }
              })
            }
          />)
        } else {
          return (<TextInput {...commonProps}/>)
        }
      } else if (stateSchema.type === 'integer' || stateSchema.type === 'number') {
        return (<NumberInput {...commonProps}/>)
      }
    } else if (type === 'greaterThan' || type === 'greaterEquals' || type === 'lessThan' || type === 'lessEquals') {
      return (<NumberInput {...commonProps}/>)
    }
  }
  render () {
    var stateNames = []
    const { type, source } = this.props
    if (type === 'equals' || type === 'notEquals') {
      stateNames = Object.keys(stateDefs)
    } else { // only number type is selectable for range types
      Object.keys(stateDefs).map((value) => {
        const stateType = stateDefs[value].payloadSchema.type
        if (stateType === 'number' || stateType === 'integer') {
          stateNames.push(value)
        }
      })
    }
    return (<div>
      <SelectInput
        source={ source + '.field' }
        label='field'
        choices={
          stateNames.map((value) => {
            return {
              id: value,
              name: value,
            }
          })
        }
        onChange={this.handleFieldChange}
      />
      {this.renderValueInput()}
    </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    savedFormValues: state.form['record-form'].values
  }
}
export default connect(mapStateToProps)(ClauseItem)
