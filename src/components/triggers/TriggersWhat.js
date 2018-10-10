import React, { Component } from 'react'
import {
  RadioButtonGroupInput,
  ArrayInput,
  SimpleFormIterator,
  TextInput,
  required
} from 'react-admin'
import ActionSelector from '../commands/ActionSelector'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class TriggersWhatComponent extends Component {
  state = {
    triggersWhat: this.props.selectedTriggersWhat ||
      (this.props.record ? this.props.record.triggersWhat : 'Command')
  }
  handleTriggersWhatChange = (_, selectedValue) => {
    this.setState({
      triggersWhat: selectedValue
    })
  }
  renderContent = () => {
    if (this.state.triggersWhat === 'Command') {
      return (<MuiThemeProvider>
        <ArrayInput source="command.aliasActions[0].actions">
          <SimpleFormIterator>
            <ActionSelector />
          </SimpleFormIterator>
        </ArrayInput>
      </MuiThemeProvider>)
    } else if (this.state.triggersWhat === 'ServerCode') {
      return (<div style={{ flexDirection: 'column' }}>
        <div><TextInput label='endpoint' source='serverCode.endpoint' validate={required()}/></div>
        <div><TextInput label='access token' source='serverCode.executorAccessToken'/></div>
        <div><TextInput label='target app id' source='serverCode.targetAppID'/></div>
        <ArrayInput label='parameters' source="serverCode.arrayedParameters">
          <SimpleFormIterator>
            <TextInput label='name' source='name'/>
            <TextInput label='value' source='value'/>
          </SimpleFormIterator>
        </ArrayInput>
      </div>)
    }
  }
  render () {
    return (
      <div>
        <RadioButtonGroupInput
          source="triggersWhat"
          choices={[
            { id: 'Command', name: 'Command' },
            { id: 'ServerCode', name: 'ServerCode' },
          ]}
          onChange={this.handleTriggersWhatChange}
        />
        {this.renderContent()}
      </div>
    )
  }
}

export default TriggersWhatComponent
