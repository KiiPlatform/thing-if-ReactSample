import React, { Component } from 'react'
import {
  SelectInput,
  SimpleFormIterator,
  ArrayInput,
} from 'react-admin'

import ClauseItem from './ClauseItem'
import { accessAttributeByPath } from '../../common/utils'
import { connect } from 'react-redux'

class ClauseSelector extends Component {
  savedData = () => {
    return accessAttributeByPath(
      this.props.savedValues,
      this.props.source)
  }
  state = {
    clauseType: this.savedData() ? this.savedData().type : null
  }

  handleClauseChange = (_, selectedValue) => {
    this.setState({ clauseType: selectedValue })
  }
  renderContent = () => {
    const { clauseType } = this.state
    if (!clauseType) {
      return
    }
    if (clauseType === 'and' || clauseType === 'or') {
      return (<ArrayInput
        label='subClause'
        source={this.props.source + '.clauses'}
      >
        <SimpleFormIterator>
          <ClauseSelector savedValues={this.props.savedValues}/>
        </SimpleFormIterator>
      </ArrayInput>)
    } else {
      return (
        <div>
          <ClauseItem
            source={this.props.source}
            type={this.state.clauseType}
          />
        </div>
      )
    }
  }
  render () {
    return (
      <div>
        <SelectInput
          label='clause type'
          source={ this.props.source + '.type'}
          choices={[
            { id: 'equals', name: 'equals' },
            { id: 'notEquals', name: 'notEquals' },
            { id: 'greaterThan', name: 'greaterThan' },
            { id: 'greaterEquals', name: 'greaterEquals' },
            { id: 'lessThan', name: 'lessThan' },
            { id: 'lessEquals', name: 'lessEquals' },
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

const mapStateToProps = (state) => {
  return {
    savedValues: state.form['record-form'] ? state.form['record-form'].values : null
  }
}

export default connect(mapStateToProps)(ClauseSelector)
