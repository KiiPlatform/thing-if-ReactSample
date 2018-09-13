import React from 'react';
import { Route } from 'react-router-dom';
import State from './components/State';
import Onboard from './components/onboard/Onboard';

export default [
    <Route exact path="/state" component={State} />,
    <Route exact path="/onboard" component={Onboard} />,
];