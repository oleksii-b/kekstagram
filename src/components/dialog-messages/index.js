import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {
  resetPostRequestStatus,
  pictureEditorHide,
  pictureEditorShow,
  setUploadingStatus,
  setDefaultValues,
} from 'store/actions';
import SuccessDialog from './SuccessDialog';
import ErrorDialog from './ErrorDialog';
import LoadingDialog from './LoadingDialog';


class DialogMessages extends React.Component {
  state = {};
  
  fetchAgain = () => {
    this.props.resetPostRequestStatus();
    this.props.pictureEditorShow();
  };
  
  uploadAnotherFile = () => {
    this.props.resetPostRequestStatus();
    this.props.pictureEditorHide();
    this.props.setDefaultValues();
    this.props.setUploadingStatus(true);
  };
  
  render() {
    const {isLoading, isLoaded, resetPostRequestStatus} = this.props;
    
    return (
      <>
        <ErrorDialog
          isLoaded={isLoaded}
          fetchAgain={this.fetchAgain}
          uploadAnotherFile={this.uploadAnotherFile}
        />

        <SuccessDialog
          isLoaded={isLoaded}
          resetPostRequestStatus={resetPostRequestStatus}
        />

        <LoadingDialog
          isLoading={isLoading}
        />
      </>
    );
  };

  static getDerivedStateFromProps = (nextProps) => {
    if (nextProps.isLoaded || nextProps.isLoading) {
      nextProps.pictureEditorHide();
    }

    return null;
  };
};

function mapStateToProps(state) {
  const {isLoading, isLoaded} = state.picturePostRequest;

  return {
    isLoading,
    isLoaded,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    resetPostRequestStatus,
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
