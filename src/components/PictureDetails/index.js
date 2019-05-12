import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as d3 from 'd3-fetch';

import {toggleBodyOverflow} from 'services/utils';
import pictureDetails from './pictureDetails';


const initialState = {
  isHidden: true,
  isLoadCommentBtnHidden: false,
  visibleCommentSize: 0,
  data: {
    comments: []
  }
};

class PictureDetails extends Component {
  state = {
    ...initialState
  }

  componentDidMount = () => {
    window.addEventListener('click', (evt) => {
      if (evt.target === this.refs.overlay) {
        this.hideDialog();
      }
    });

    document.addEventListener('keydown', (evt) => {
      if (evt.keyCode === 27) {
        this.hideDialog();
      }
    });
  }

  componentDidUpdate = () => {
    for (let avatarContainer of document.querySelectorAll('[data-avatar]')) {
      d3.svg(`https://raw.githubusercontent.com/oleksii-b/kekstagram/master/assets/img/${avatarContainer.dataset.avatar}`)
        .then(data => {
          const oSerializer = new XMLSerializer();

          avatarContainer.innerHTML = oSerializer.serializeToString(data);
        });
    }
  }

  componentWillReceiveProps = (nextProps, nextState) => {
    if (nextProps.activePicture.url) {
      const commentsSize = nextProps.activePicture.comments.length;

      toggleBodyOverflow('hidden');
      this.setState({
        ...this.initialState,
        visibleCommentSize: commentsSize < 5 ? commentsSize : 5,
        isLoadCommentBtnHidden: commentsSize < 5 ? true : nextState.isLoadCommentBtnHidden,
        isHidden: false,
        data: nextProps.activePicture
      });
    }
  }

  hideDialog = () => {
    this.refs.overlay.scrollTop = 0;

    toggleBodyOverflow('visible');
    this.setState({
      ...initialState
    });
  }

  loadMoreComments = () => {
    let commentSize = this.state.data.comments.length,
      visibleCommentSize = this.state.visibleCommentSize + 5;

    if (visibleCommentSize > commentSize) {
      visibleCommentSize = commentSize;
    }

    this.setState({
      visibleCommentSize: visibleCommentSize,
      isLoadCommentBtnHidden: commentSize <= visibleCommentSize
    });
  }

  render = () => {
    const {isHidden, visibleCommentSize, isLoadCommentBtnHidden} = this.state;
    const activePicture = this.state.data;

    return pictureDetails({
      isHidden,
      activePicture,
      visibleCommentSize,
      isLoadCommentBtnHidden,
      hideDialog: this.hideDialog,
      loadMoreComments: this.loadMoreComments
    });
  }
}

function mapStateToProps(state) {
  return {
    activePicture: state.pictureFetch.activePicture
  }
}

export default connect(mapStateToProps)(PictureDetails);
