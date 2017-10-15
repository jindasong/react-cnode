import '@assets/sass/base.css';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Home from '@views/home/index';
class App extends Component {
  render () {
    return (
      <Router>
        <Route path="/" component={ Home }></Route>
      </Router>
    );
  }
}

export default App;
