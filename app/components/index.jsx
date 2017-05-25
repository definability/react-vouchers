import React from 'react';

import { IndexRoute, Route, Router, browserHistory } from 'react-router';

import '../styles/main.scss';

import Home from './Home';
import Container from './Container';
import Detailed from './voucher/Detailed';

class Application extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Container}>
          <IndexRoute
            component={Home}
          />
          <Route
            path="/:id"
            component={Detailed}
          />
        </Route>
      </Router>
    );
  }
}

export default Application;
