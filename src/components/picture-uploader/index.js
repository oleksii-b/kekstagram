import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {
  setPictureSrc,
  pictureEditorShow,
  setUploadingStatus,
} from 'store/actions';


class PictureUploader extends React.PureComponent {
  componentDidUpdate() {
    if (!this.props.pictureSrc) {
      this.inputRef.current.value = null;

      if (this.props.isUploading) {
        this.inputRef.current.click();
        this.props.setUploadingStatus(false);
      }
    }
  };

  inputRef = React.createRef();

  onInputChange = ({target}) => {
    if (target.files && target.files[0]) {
      const reader = new FileReader();

      reader.addEventListener('load', ({target}) => {
        this.props.pictureEditorShow();
        this.props.setPictureSrc(target.result);
      });

      reader.readAsDataURL(target.files[0]);
    }
  };

  render = () => {
    return (
      <fieldset className="img-upload__start">
        <label className="img-upload__label img-upload__control">
          <input
            id="uploadFile"
            type="file"
            className="img-upload__input visually-hidden"
            ref={this.inputRef}
            onInput={this.onInputChange}
            name="filename"
          />

          Загрузить
        </label>
      </fieldset>
    );
  };
};

function mapStateToProps(state) {
  return {
    pictureSrc: state.pictureFormData.src,
    isUploading: state.pictureEditor.isUploading,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    pictureEditorShow,
    setPictureSrc,
    setUploadingStatus,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PictureUploader);
