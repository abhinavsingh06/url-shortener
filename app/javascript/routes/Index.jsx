import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import List from '../components/List';
import Category from '../components/Category';
import Report from '../components/Report';

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={List} />
      <Route path="/category" exact component={Category} />
      <Route path="/report" exact component={Report} />
    </Switch>
  </Router>
);
