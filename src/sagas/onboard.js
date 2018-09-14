
import { onboardActions } from '../actions/onboard'
import { APIAuthor, App, Site } from 'thing-if'
import { KiiApp } from '../config'
import { onboardSucceeded, onboardFailed } from '../actions/onboard'
import { put, take, call } from 'redux-saga/effects';

export default function* onboardSaga() {
    const action = yield take(onboardActions.ONBOARD_REQUEST)
    const { token,requestObj } = action.payload
    const apiAuthor = new APIAuthor(
        token,
        new App(KiiApp.appID,
            KiiApp.appKey,
            Site.JP))

    try{
        yield call(apiAuthor.onboardWithVendorThingID.bind(apiAuthor), requestObj)
    } catch (err) {
        console.error('onboard failed: ' + err)
        yield put(onboardFailed(err))
        return
    }
    console.log('onboard succeeded')
    yield put(onboardSucceeded())

}