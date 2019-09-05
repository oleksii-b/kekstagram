import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import routes from 'components/routes';
import NavBar from 'components/NavBar';


const PictureList = React.lazy(() => import('components/PictureList'));
const PictureDetails = React.lazy(() => import('components/PictureDetails'));
const DialogMessages = React.lazy(() => import('components/DialogMessages'));

export default function App() {
  return (
    <Router>
      <NavBar />

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
