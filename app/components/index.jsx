import React from 'react';

import { IndexRoute, Route, Router, hashHistory } from 'react-router';

import '../styles/main.scss';

const Container = () => <div />;
const Home = () => <div />;
const Table = () => <div />;

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
            component={Table}
          />
        </Route>
      </Router>
    );
  }
}

export default Application;
