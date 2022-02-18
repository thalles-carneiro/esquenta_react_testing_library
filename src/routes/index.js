import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';

import * as Pages from '../pages';

export class AppRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/characters" component={ Pages.Characters } />

        <Route exact path="/" component={ Pages.Home } />

        <Route path="*" component={ Pages.NotFound } />
      </Switch>
    );
  }
}

export default AppRoutes;
