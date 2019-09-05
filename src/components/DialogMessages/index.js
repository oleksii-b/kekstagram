import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {resetFetchStatus} from 'store/actions/pictureFetch';
import {pictureEditorHide, pictureEditorShow, setUploadingStatus} from 'store/actions/pictureEditor';
import {setDefaultValues} from 'store/actions/setPictureData';
import SuccessDialog from './SuccessDialog';
import ErrorDialog from './ErrorDialog';
import LoadingDialog from './LoadingDialog';


class DialogMessages extends React.Component {
  static getDerivedStateFromProps = (nextProps) => {
    if (nextProps.isLoaded || nextProps.isLoading) {
      nextProps.pictureEditorHide();
    }

    return null;
  };

  fetchAgain = () => {
    this.props.resetFetchStatus();
    this.props.pictureEditorShow();
  };

  uploadAnotherFile = () => {
    this.props.resetFetchStatus();
    this.props.pictureEditorHide();
    this.props.setDefaultValues();
    this.props.setUploadingStatus(true);
  };

  render() {
    const {isLoading, isLoaded, resetFetchStatus} = this.props;

    return (
      <>
        <ErrorDialog
          isLoaded={isLoaded}
          fetchAgain={this.fetchAgain}
          uploadAnotherFile={this.uploadAnotherFile}
        />

        <SuccessDialog
          isLoaded={isLoaded}
          resetFetchStatus={resetFetchStatus}
        />

        <LoadingDialog
          isLoading={isLoading}
        />
      </>
    );
  };
};

function mapStateToProps(state) {
  const {isLoading, isLoaded} = state.pictureFetch;

  return {
    isLoading,
    isLoaded,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    resetFetchStatus,
    pictureEditorHide,
    pictureEditorShow,
    setDefaultValues,
    setUploadingStatus,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogMessages);
