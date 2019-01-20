import React, {Component} from 'react';
import {connect} from 'react-redux';

import {setActivePicture} from 'store/actions/pictureFetch';


class PictureMini extends Component {
  constructor(props) {
    super(props);

    this.url = null
  }

  componentWillMount = () => {
    this.url = `https://github.com/oleksii-b/kekstagram/blob/master/assets/img/${this.props.data.url}?raw=true`;
  }

  onPictureLinkClick = (evt) => {
    evt.preventDefault();
    this.props.setActivePicture({
      ...this.props.data,
      url: this.url
    });
  }

  render = () => {
    const picture = this.props.data;

    return (
      <a href={picture.url} className='picture' onClick={this.onPictureLinkClick}>
        <img className='picture__img' src={this.url} width='182' height='182' alt={picture.description} />
        <p className='picture__info'>
          <span className='picture__comments'>{picture.comments.length}</span>
          <span className='picture__likes'>{picture.likes}</span>
        </p>
      </a>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setActivePicture: (url) => dispatch(setActivePicture(url))
  }
}

export default connect(null, mapDispatchToProps)(PictureMini);
