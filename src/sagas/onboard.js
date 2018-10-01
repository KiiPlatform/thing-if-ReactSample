
import { APIAuthor, App, Site } from 'thing-if'
import { KiiApp } from '../config'
import { onboardSucceeded, onboardFailed, onboardActions } from '../actions/onboard'
import { put, take, call } from 'redux-saga/effects'
import { storeThing } from '../common/utils'
import { showNotification } from 'react-admin'

export default function * onboardSaga () {
  while (true) {
    const action = yield take(onboardActions.ONBOARD_REQUEST)
    const { token, requestObj } = action.payload
    const apiAuthor = new APIAuthor(
      token,
      new App(KiiApp.appID,
        KiiApp.appKey,
        Site.JP))
    var onboardResult
    try {
      onboardResult = yield call(apiAuthor.onboardWithVendorThingID.bind(apiAuthor), requestObj)
    } catch (err) {
      yield put(onboardFailed(err))
      yield put(showNotification(
        'onboard.failed',
        'warning',
        {
          messageArgs: {
            err: err
          }
        }))
      return
    }
    storeThing(requestObj.vendorThingID, onboardResult.thingID)
    yield put(showNotification('onboard.succeeded'))
    yield put(onboardSucceeded())
  }
}
