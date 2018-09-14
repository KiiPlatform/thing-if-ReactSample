
import { APIAuthor, App, Site } from 'thing-if'
import { KiiApp } from '../config'
import { onboardSucceeded, onboardFailed, onboardActions } from '../actions/onboard'
import { put, take, call } from 'redux-saga/effects'
import { storeThing } from '../common/utils'

export default function * onboardSaga () {
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
    console.error('onboard failed: ' + err)
    yield put(onboardFailed(err))
    return
  }
  storeThing(requestObj.vendorThingID, onboardResult.thingID)
  yield put(onboardSucceeded())
}
