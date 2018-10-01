import React, { Component } from 'react'
import { Admin, Resource } from 'react-admin'
import AuthProvider from './authProvider'
import CustomRoutes from './CustomRoute'
import AppLayout from './components/Layout'
import onboardReducer from './reducers/onboard'
import onboardSaga from './sagas/onboard'
import { dataProvider } from './dataProvider'
import CommandList from './components/commands/CommandList'
import CommandDetail from './components/commands/CommandDetail'
import { messages } from './TranslatedMessage'

const i18nProvider = locale => messages[locale]
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
        locale='en'
        i18nProvider={i18nProvider}
      >
        <Resource name='commands' list={CommandList} show={CommandDetail}/>
        <Resource name='triggers' />
      </Admin>
    )
  }
}

export default App
