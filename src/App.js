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
import CommandCreation from './components/commands/CommandCreation'
import { messages } from './TranslatedMessage'
import TriggerList from './components/triggers/TriggerList'
import TriggerCreation from './components/triggers/TriggerCreation'

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
        <Resource
          name='commands'
          list={CommandList}
          show={CommandDetail}
          create={CommandCreation}
        />
        <Resource
          name='triggers'
          list={TriggerList}
          create={TriggerCreation}
        />
      </Admin>
    )
  }
}

export default App
