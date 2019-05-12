import React, {Component} from 'react';
import {connect} from 'react-redux';

import {setActivePicture} from 'store/actions/pictureFetch';
import pictureMini from './pictureMini';


class PictureMini extends Component {
  constructor(props) {
    super(props);

    this.url = null
  }

  componentWillMount = () => {
    this.url = `https://github.com/oleksii-b/kekstagram/blob/master/assets/img/${this.props.data.url}?raw=true`;
  }

  setActivePicture = (evt) => {
    evt.preventDefault();
    this.props.setActivePicture({
      ...this.props.data,
      url: this.url
    });
  }

  render = () => {
    const picture = this.props.data;

    return pictureMini({
      picture,
      url: this.url,
      setActivePicture: this.setActivePicture
    });
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setActivePicture: (url) => dispatch(setActivePicture(url))
  }
}

export default connect(null, mapDispatchToProps)(PictureMini);
