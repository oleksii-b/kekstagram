import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getPictures} from 'store/actions/getPictures';
import {pictureEditorHide, pictureEditorShow} from 'store/actions/pictureEditor';
import {setDefaultValues} from 'store/actions/setPictureData';
import pictureList from './pictureList';


class PictureList extends Component {
  state = {
    pictures: []
  }

  componentDidMount = () => {
    this.props.fetchPictures();
  }

  componentWillReceiveProps = (nextProps) => {
    if (typeof nextProps.isLoaded === 'boolean') {
      if (nextProps.isLoaded) {
        this.props.setDefaultValues();
      }

      this.props.pictureEditorHide();
    }

    this.setState({
      pictures: nextProps.pictures
    });
  }

  onUploaderValueChange = (evt) => {
    const input = evt.target;

    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.addEventListener('load', (evt) => {
        this.props.pictureEditorShow();
        this.setState({
          picture: evt.target.result
        });
      });

      reader.readAsDataURL(input.files[0]);
    }
  }

  render = () => pictureList({
    picture: this.state.picture,
    pictures: this.state.pictures,
    onUploaderValueChange: this.onUploaderValueChange
  })
};

function mapStateToProps(state) {
  return {
    pictures: state.pictureFetch.all,
    isLoading: state.pictureFetch.isLoading,
    isLoaded: state.pictureFetch.isLoaded,
    hashtags: state.pictureData.hashtags
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPictures: () => dispatch(getPictures()),
    pictureEditorHide: () => dispatch(pictureEditorHide()),
    pictureEditorShow: () => dispatch(pictureEditorShow()),
    setDefaultValues: () => dispatch(setDefaultValues())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PictureList);
