import React from 'react';
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import routes from 'components/routes';
import NavBar from 'components/nav-bar';

const PictureList = React.lazy(() => import('components/picture-list'));
const PictureDetails = React.lazy(() => import('components/picture-details'));
const DialogMessages = React.lazy(() => import('components/dialog-messages'));

export default function App() {
  return (
    <Router>
      <header>
        <NavBar />
      </header>

      <React.Suspense fallback={null}>
        <Switch>
          <Redirect exact from="/" to={routes.images.path} />
          <Route exact path={routes.images.path} component={PictureList} />
          <Route component={() => <div />} />
        </Switch>

        <PictureDetails />

        <DialogMessages />
      </React.Suspense>
    </Router>
  );
}
