import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import PictureList from 'components/PictureList';
import PictureDetails from 'components/PictureDetails';
import DialogMessages from 'components/DialogMessages';


export default class App extends Component {
  render() {
    return (
      <Fragment>
        <PictureList />

        <PictureDetails />

        <DialogMessages />
      </Fragment>
    );
  }
}
