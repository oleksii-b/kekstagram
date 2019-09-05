import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {setActivePicture} from 'store/actions/pictureFetch';


class PictureMini extends React.Component {
  constructor(props) {
    super(props);

    this.url = null;
  };

  setActivePicture = (evt) => {
    evt.preventDefault();

    this.props.setActivePicture({
      ...this.props.data,
      url: this.url,
    });
  };

  render = () => {
    const {url, description, comments, likes} = this.props.data;

    this.url = `https://github.com/oleksii-b/kekstagram/blob/master/assets/img/${this.props.data.url}?raw=true`;

    return (
      <a href={url} className='picture' onClick={this.setActivePicture}>
        <img className='picture__img' src={this.url} width='182' height='182' alt={description} />

        <div className='picture__info'>
          <span className='picture__comments'>{comments.length}</span>
          <span className='picture__likes'>{likes}</span>
        </div>
      </a>
    );
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setActivePicture,
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(PictureMini);
