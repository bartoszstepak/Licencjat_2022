import React from 'react';
import { HashRouter , Route, Switch } from "react-router-dom";
import Dashboard from './components/dashboard/dashboard';
import Visualizer from './components/visualizer/visualizer';

import './App.css';


export default class App extends React.Component {

  render() {
    return (
      <HashRouter >
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/visualizer" component={Visualizer} />
        </Switch>
      </HashRouter >
    );
  }
}

