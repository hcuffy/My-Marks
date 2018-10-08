/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import {HOME, SCHOOL} from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import SchoolPage from './containers/SchoolPage';

export default () => (
  <App>
    <Switch>
      <Route path={SCHOOL} component={SchoolPage} />
      <Route path={HOME} component={HomePage} />
    </Switch>
  </App>
);
