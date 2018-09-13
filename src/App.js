import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin'
import AuthProvider from './authProvider'

class App extends Component {
  render() {
    return (
      <Admin
        authProvider={AuthProvider}
        dataProvider={{}}
      >
      <Resource />
      </Admin>
    );
  }
}

export default App;
