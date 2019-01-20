import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import PictureList from './components/PictureList';
import PictureDetails from './components/PictureDetails';
import FetchStatusMesseges from './components/FetchStatusMesseges';


class App extends Component {
  render() {
    return (
      <Fragment>
        <PictureList />

        <PictureDetails
          activePicture={this.props.activePicture}
        />

        <FetchStatusMesseges />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    activePicture: state.pictureFetch.active
  }
}

export default connect(mapStateToProps)(App);
