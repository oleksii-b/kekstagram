import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {
  setPictureSrc,
  pictureEditorShow,
  setUploadingStatus,
} from 'store/actions';
import './index.scoped.less';

class PictureUploader extends React.PureComponent {
  componentDidUpdate() {
    if (!this.props.pictureSrc) {
      this.inputRef.current.value = null;

      if (this.props.isUploading) {
        this.inputRef.current.click();
        this.props.setUploadingStatus(false);
      }
    }
  }

  inputRef = React.createRef();

  onInputChange = ({target: {files}}) => {
    if (files && files[0]) {
      const reader = new FileReader();

      reader.addEventListener('load', ({target: {result}}) => {
        this.props.pictureEditorShow();
        this.props.setPictureSrc(result);
      });

      reader.readAsDataURL(files[0]);
    }
  }

  render() {
    return (
      <fieldset className="uploader">
        <label className="uploader-label">
          <input
            id="uploadFile"
            type="file"
            className="uploader-input visually-hidden"
            ref={this.inputRef}
            onInput={this.onInputChange}
            name="filename"
          />

          Загрузить
        </label>
      </fieldset>
    );
  }
}

function mapStateToProps(state) {
  return {
    pictureSrc: state.pictureFormData.src,
    isUploading: state.pictureEditor.isUploading,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      pictureEditorShow,
      setPictureSrc,
      setUploadingStatus,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PictureUploader);
