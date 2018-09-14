import React, { Component } from 'react'
import { Admin, Resource } from 'react-admin'
import AuthProvider from './authProvider'
import CustomRoutes from './CustomRoute'
import AppLayout from './components/Layout'
import onboardReducer from './reducers/onboard'
import onboardSaga from './sagas/onboard'

class App extends Component {
  render () {
    return (
      <Admin
        authProvider={AuthProvider}
        dataProvider={{}}
        customRoutes={CustomRoutes}
        appLayout={AppLayout}
        customReducers={{ onboard: onboardReducer }}
        customSagas={[onboardSaga]}
      >
        <Resource name='commands' />
        <Resource name='triggers' />
      </Admin>
    )
  }
}

export default App
