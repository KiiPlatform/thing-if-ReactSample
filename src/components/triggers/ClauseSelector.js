import React, { Component } from 'react'
import {
  SelectInput,
  SimpleFormIterator,
  ArrayInput,
} from 'react-admin'

class ClauseSelector extends Component {
  state = {}
  handleClauseChange = (_, selectedValue) => {
    this.setState({ clauseType: selectedValue })
  }
  renderContent = () => {
    const { clauseType } = this.state
    if (clauseType === 'and' || clauseType === 'or') {
      return (<ArrayInput source={this.props.source + '.clause.clauses'}>
        <SimpleFormIterator>
          <ClauseSelector />
        </SimpleFormIterator>
      </ArrayInput>)
    }
  }
  render () {
    const { source } = this.props
    return (
      <div>
        <SelectInput
          label='clause type'
          source={ source + '.' + 'clause.type'}
          choices={[
            { id: 'equals', name: 'equals' },
            { id: 'notEquals', name: 'notEquals' },
            { id: 'range', name: 'range' },
            { id: 'and', name: 'and' },
            { id: 'or', name: 'or' },
          ]}
          onChange={this.handleClauseChange}
        />
        {this.renderContent()}
      </div>
    )
  }
}

export default ClauseSelector
