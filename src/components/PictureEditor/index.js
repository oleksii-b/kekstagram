import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';

import {postPicture} from 'store/actions/pictureFetch';
import {pictureEditorHide} from 'store/actions/pictureEditor';
import {setPictureHashtags, setPictureDescription, setDefaultValues} from 'store/actions/setPictureData';
import {toggleBodyOverflow} from 'services/utils';
import pictureEditor from './pictureEditor';


class PictureEditor extends Component {
  componentDidMount = () => {
    this.props.initialize();

    window.addEventListener('click', (evt) => {
      if (evt.target === this.overlay) {
        this.resetPictureEditor();
      }
    });
  }

  componentWillReceiveProps = (nextProps) => {
    toggleBodyOverflow(nextProps.isHidden ? 'visible' : 'hidden');

    if (this.props.picture !== nextProps.picture) {
      this.overlay.scrollTop = 0;

      this.props.initialize();
    }
  }

  setOverlayRef = (overlay) => this.overlay = overlay;

  submitForm = (evt) => {
    evt.preventDefault();
    this.props.handleSubmit();
    this.props.postPicture(new FormData(evt.target));
  }

  resetPictureEditor = () => {
    this.overlay.scrollTop = 0;

    this.props.pictureEditorHide();
    this.props.setDefaultValues();
    this.props.initialize();
  }

  onHashtagsChange = (evt) => {
    this.props.setPictureHashtags(evt.target.value);
  }

  render = () => pictureEditor({
    pictureUploader: this.props.children,
    isHidden: this.props.isHidden,
    hide: this.resetPictureEditor,
    picture: this.props.picture,
    effectName: this.props.effect,
    scale: this.props.scale,
    setOverlayRef: this.setOverlayRef,
    setPictureHashtags: this.props.setPictureHashtags,
    submitForm: this.submitForm
  });
}

function mapStateToProps(state) {
  return {
    isHidden: state.pictureEditor.isHidden,
    formFieldValidity: state.pictureEditor.formFieldValidity,
    isLoaded: state.pictureFetch.isLoaded,
    scale: state.pictureData.scale,
    effect: state.pictureData.effect,
    effectLevel: state.pictureData.effectLevel,
    hashtags: state.pictureData.hashtags,
    description: state.pictureData.description
  }
}

function mapDispatchToProps(dispatch) {
  return {
    postPicture: (data) => dispatch(postPicture(data)),
    pictureEditorHide: () => dispatch(pictureEditorHide()),
    setPictureHashtags: (hashtags) => dispatch(setPictureHashtags(hashtags)),
    setPictureDescription: (description) => dispatch(setPictureDescription(description)),
    setDefaultValues: () => dispatch(setDefaultValues())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: 'form',
    enableReinitialize: true,
    onSubmit: () => void(0)
  })(PictureEditor)
);
