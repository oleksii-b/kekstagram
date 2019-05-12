import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import {resetFetchStatus} from 'store/actions/pictureFetch';
import {pictureEditorHide, pictureEditorShow} from 'store/actions/pictureEditor';
import {setDefaultValues} from 'store/actions/setPictureData';
import {uploadPicture} from 'services/utils';
import successDialog from './successDialog';
import errorDialog from './errorDialog';
import loadingDialog from './loadingDialog';


class DialogMessages extends Component {
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.isLoaded || nextProps.isLoading) {
      this.props.pictureEditorHide();
    }
  }

  onTryAgainBtnClick = () => {
    this.props.resetFetchStatus();
    this.props.pictureEditorShow();
  }

  onUploadAnotherFileBtnClick = () => {
    this.props.resetFetchStatus();
    this.props.pictureEditorHide();
    this.props.setDefaultValues();
    uploadPicture();
  }

  render() {
    const {isLoading, isLoaded, resetFetchStatus} = this.props;

    return (
      <Fragment>
        {
          errorDialog({
            isLoaded,
            onTryAgainBtnClick: this.onTryAgainBtnClick,
            onUploadAnotherFileBtnClick: this.onUploadAnotherFileBtnClick
          })
        }

        {
          successDialog({
            isLoaded,
            resetFetchStatus
          })
        }

        {
          loadingDialog({
            isLoading
          })
        }
      </Fragment>
    );
  }
};

function mapStateToProps(state) {
  return {
    isLoading: state.pictureFetch.isLoading,
    isLoaded: state.pictureFetch.isLoaded
  }
}

function mapDispatchToProps(dispatch) {
  return {
    resetFetchStatus: () => dispatch(resetFetchStatus()),
    pictureEditorHide: () => dispatch(pictureEditorHide()),
    pictureEditorShow: () => dispatch(pictureEditorShow()),
    setDefaultValues: () => dispatch(setDefaultValues())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogMessages);
