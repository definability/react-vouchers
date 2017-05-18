import React from 'react';

import { IndexRoute, Route, Router, hashHistory } from 'react-router';

import '../styles/main.scss';

import Home from './Home';
import Container from './Container';
import Detailed from './Detailed';

class Application extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Container}>
          <IndexRoute
            component={Home}
          />
          <Route
            path="/details"
            component={Detailed}
          />
        </Route>
      </Router>
    );
  }
}

export default Application;
