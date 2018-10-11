import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { Title, ArrayField, TextField, Datagrid } from 'react-admin'
import { connect } from 'react-redux'
import { currentStateRequest } from '../actions/thingState'
import { getOnboardedThing, getLoginUser } from '../common/utils'

class ThingState extends Component {
  componentDidMount () {
    const onboardedThing = getOnboardedThing()
    const user = getLoginUser()
    this.props.currentStateRequest(onboardedThing.thingID, user.token)
  }
  render () {
    console.log('current state: ' + JSON.stringify(this.props))
    return (<Card>
      <Title title="State of thing" />
      <CardContent>
        <ArrayField source='currentState' {...this.props}>
          <Datagrid>
            <TextField source='field'/>
            <TextField source='value'/>
          </Datagrid>
        </ArrayField>
      </CardContent>
    </Card>)
  }
}

const mapStateToProps = state => ({
  record: {
    currentState: state.thingState.currentState
  }
})

export default connect(mapStateToProps,
  {
    currentStateRequest: currentStateRequest
  })(ThingState)
