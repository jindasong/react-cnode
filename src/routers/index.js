import React from 'react';
import Home from '@views/home';
import Error404 from '@views/error/404';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

const router = (
  <Router>
    <Switch>
      <Route path="/home" component={ Home } />
      <Route component={ Error404 } />
    </Switch>
  </Router>
);

export default router;