
import { APIAuthor, App, Site, TypedID, Types } from 'thing-if'
import { KiiApp } from '../config'
import { put, take, call } from 'redux-saga/effects'
import { showNotification } from 'react-admin'
import { thingStateActions, currentStateSucceeded, currentStateFailed } from '../actions/thingState'

export default function * thingStateSaga () {
  while (true) {
    const action = yield take(thingStateActions.CURRENT_STATE_REQUEST)
    const { thingID, token } = action.payload
    const apiAuthor = new APIAuthor(
      token,
      new App(KiiApp.appID,
        KiiApp.appKey,
        Site.JP))

    const thingTarget = new TypedID(Types.Thing, thingID)
    var currentState
    try {
      const stateObject = yield call(apiAuthor.getState.bind(apiAuthor), thingTarget, 'AC')
      currentState = Object.keys(stateObject).map((key) => {
        return {
          field: key,
          value: '' + stateObject[key]
        }
      })
    } catch (err) {
      yield put(currentStateFailed(err))
      yield put(showNotification(
        'currentState.failed',
        'warning',
        {
          messageArgs: {
            err: err
          }
        }))
      return
    }
    yield put(showNotification('currentState.succeeded'))
    yield put(currentStateSucceeded(currentState))
  }
}
