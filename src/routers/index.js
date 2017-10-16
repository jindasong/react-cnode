import React from 'react';
import Home from '@views/home';
import TopicsDetails from '@views/topics/details';
import Error404 from '@views/error/404';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

const router = (
  <Router>
    <Switch>
      <Route path="/" exact component={ Home } />
      <Route path="/home" exact component={ Home } />
      <Route path="/topics/details/:id" exact component={ TopicsDetails } />
      <Route component={ Error404 } />
    </Switch>
  </Router>
);

export default router;