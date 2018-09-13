import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin'
import AuthProvider from './authProvider'
import CustomRoutes from './CustomRoute'
import AppLayout from './components/Layout'

class App extends Component {
  render() {
    return (
      <Admin
        authProvider={AuthProvider}
        dataProvider={{}}
        customRoutes={CustomRoutes}
        appLayout={AppLayout}
      >
      <Resource name='commands' />
      <Resource name='triggers' />
      </Admin>
    );
  }
}

export default App;
