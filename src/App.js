import React, { Component } from 'react'
import { Admin, Resource } from 'react-admin'
import AuthProvider from './authProvider'
import CustomRoutes from './CustomRoute'
import AppLayout from './components/Layout'
import onboardReducer from './reducers/onboard'
import onboardSaga from './sagas/onboard'
import { dataProvider } from './dataProvider'
import CommandList from './components/commands/CommandList'

class App extends Component {
  render () {
    return (
      <Admin
        authProvider={AuthProvider}
        customRoutes={CustomRoutes}
        appLayout={AppLayout}
        customReducers={{ onboard: onboardReducer }}
        customSagas={[onboardSaga]}
        dataProvider={dataProvider}
      >
        <Resource name='commands' list={CommandList} />
        <Resource name='triggers' />
      </Admin>
    )
  }
}

export default App
