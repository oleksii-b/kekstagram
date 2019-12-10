import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';

import {
  postPicture,
  pictureEditorHide,
  setPictureSrc,
  setPictureHashtags,
  setPictureDescription,
  setDefaultValues,
} from 'store/actions';
import {toggleBodyOverflow} from 'utils/helpers';
import PictureUploader from 'components/picture-uploader';


const PictureEditor = React.lazy(() => import('./picture-editor'));
const PicturePreview = React.lazy(() => import('./picture-preview'));

class PictureUploadForm extends React.PureComponent {
  state = {
    picture: null,
    isEditorVisible: false,
  };

  componentDidMount = () => {
    this.props.initialize();

    window.addEventListener('click', ({target}) => {
      if (target === this.overlay) {
        this.resetPictureEditor();
      }
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.overlay && this.state.picture !== prevState.picture) {
      this.overlay.scrollTop = 0;

      this.props.initialize();
    }
  };

  setOverlayRef = (overlay) => this.overlay = overlay;

  submitForm = (evt) => {
    evt.preventDefault();

    this.props.handleSubmit();

    if (!this.props.invalid) {
      this.props.postPicture(new FormData(evt.target));
    }
  };

  resetPictureEditor = () => {
    this.overlay.scrollTop = 0;

    this.props.pictureEditorHide();
    this.props.setDefaultValues();
    this.props.initialize();
  };

  onHashtagsChange = ({target}) => {
    this.props.setPictureHashtags(target.value);
  };

  render = () => {
    const {isHidden, effect, effectLevel, scale, setPictureHashtags} = this.props;
    const {picture, isEditorVisible} = this.state;

    return (
      <form
        action='https://js.dump.academy/kekstagram'
        className='img-upload__form'
        id='upload-select-image'
        method='post'
        encType='multipart/form-data'
        autoComplete='off'
        onSubmit={this.submitForm}
      >
        <PictureUploader />

        <React.Suspense fallback={null}>
          {
            isEditorVisible
            &&
              <PictureEditor
                isHidden={isHidden}
                hide={this.resetPictureEditor}
                effectName={effect}
                setOverlayRef={this.setOverlayRef}
                setPictureHashtags={setPictureHashtags}
              >
                <PicturePreview
                  scale={scale}
                  src={picture}
                  effectName={effect}
                  effectLevel={effectLevel}
                  alt='Предварительный просмотр фотографии'
                />
              </PictureEditor>
          }
        </React.Suspense>
      </form>
    );
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {src, isHidden, isLoaded, initialize} = nextProps;
    const nextState = {};

    toggleBodyOverflow(isHidden ? 'visible' : 'hidden');

    if (isLoaded) {
      initialize();
    }

    // render PictureEditor after the first activation
    if (!prevState.isEditorVisible && !isHidden) {
      nextState.isEditorVisible = true;
    }

    return {
      ...nextState,
      picture: src,
    };
  };
};

function mapStateToProps(state) {
  const {src, scale, effect, effectLevel, hashtags, description} = state.pictureFormData;
  const {isHidden} = state.pictureEditor;
  const {isLoaded} = state.picturePostRequest;

  return {
    isLoaded,
    src,
    scale,
    effect,
    effectLevel,
    hashtags,
    description,
    isHidden,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    postPicture,
    pictureEditorHide,
    setPictureSrc,
    setPictureHashtags,
    setPictureDescription,
    setDefaultValues,
  }, dispatch);
};

const formCongif = {
  form: 'form',
  enableReinitialize: true,
  onSubmit: () => void(0),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm(formCongif)(PictureUploadForm),
);
