import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin'
import KiiSDK from 'kii-cloud-sdk'
import { KiiApp } from './config'

const kii = KiiSDK.create()
kii.Kii.initializeWithSite(KiiApp.appID, KiiApp.appKey, kii.KiiSite.JP)

export default (type, params) => {
  // called when the user attempts to log in
  if (type === AUTH_LOGIN) {
    const { username, password } = params
    return new Promise((resolve, reject) => {
      kii.KiiUser.authenticate(username, password)
        .then((kiiUser) => {
          window.localStorage.setItem('userID', kiiUser.getID())
          window.localStorage.setItem('token', kiiUser.getAccessToken())
          return resolve()
        }).catch((err) => {
          console.error(err)
          return reject(err)
        })
    })
  }
  // called when the user clicks on the logout button
  if (type === AUTH_LOGOUT) {
    window.localStorage.removeItem('userID')
    window.localStorage.removeItem('token')
    return Promise.resolve()
  }
  // called when the API returns an error
  if (type === AUTH_ERROR) {
    const { status } = params
    if (status === 401 || status === 403) {
      window.localStorage.removeItem('userID')
      window.localStorage.removeItem('token')
      return Promise.reject(Error.new('failed to sign in'))
    }
    return Promise.resolve()
  }
  // called when the user navigates to a new location
  if (type === AUTH_CHECK) {
    return window.localStorage.getItem('token')
      ? Promise.resolve()
      : Promise.reject(Error.new('need to sign in'))
  }
  return Promise.reject(Error.new('Unknown method'))
}
