import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as d3 from 'd3-fetch';
import cx from 'classnames';

import {setActivePicture} from 'store/actions';
import {toggleBodyOverflow} from 'utils/helpers';
import PictureInfo from './picture-info';
import Comments from './comments';
import './index.scoped.less';

const initialState = {
  numberOfVisibleComments: 0,
  data: {
    url: null,
    comments: [],
  },
};

class PictureDetails extends React.Component {
  state = {
    ...initialState,
  }

  overlayRef = React.createRef();

  componentDidMount() {
    window.addEventListener('click', (evt) => {
      if (evt.target === this.overlayRef.current) {
        this.hideDialog();
      }
    });

    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        this.hideDialog();
      }
    });
  }

  componentDidUpdate() {
    for (let avatarContainer of document.querySelectorAll('[data-avatar]')) {
      d3.svg(`https://raw.githubusercontent.com/oleksii-b/kekstagram/master/assets/img/${avatarContainer.dataset.avatar}`)
        .then(data => {
          const oSerializer = new XMLSerializer();

          avatarContainer.innerHTML = oSerializer.serializeToString(data);
        });
    }
  }

  hideDialog = () => {
    this.overlayRef.current.scrollTop = 0;

    toggleBodyOverflow('visible');
    this.props.setActivePicture(null);
  }

  loadMoreComments = () => {
    let numberOfComments = this.state.data.comments.length;
    let numberOfVisibleComments = this.state.numberOfVisibleComments + 5;

    if (numberOfVisibleComments > numberOfComments) {
      numberOfVisibleComments = numberOfComments;
    }

    this.setState({
      numberOfVisibleComments,
    });
  }

  render() {
    const {numberOfVisibleComments, data} = this.state;
    const {url, description, likes, comments} = data;

    return (
      <section
        className={cx({
          'overlay': true,
          'hidden': !url,
        })}
        ref={this.overlayRef}
      >
        <h2 className="visually-hidden">
          Просмотр фотографии
        </h2>

        <div className="picture-preview">
          {/* Просмотр изображения */}
          <div>
            <img className="picture-lg" src={url} alt="" width="600" height="600" />
          </div>

          {/* Информация об изображении. Подпись, комментарии, количество лайков */}
          <PictureInfo
            description={description}
            numberOfLikes={likes}
          >
            {/* Комментарии к изображению */}
            <Comments
              loadMoreComments={this.loadMoreComments}
              listOfComments={comments}
              numberOfVisibleComments={numberOfVisibleComments}
            />
          </PictureInfo>

          {/* Кнопка для выхода из полноэкранного просмотра изображения */}
          <button
            type="reset"
            className="btn-cancel cancel"
            onClick={this.hideDialog}
          >
            Закрыть
          </button>
        </div>
      </section>
    );
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {activePicture} = nextProps;

    if (activePicture) {
      const numberOfComments = activePicture.comments.length;

      let {numberOfVisibleComments} = prevState;

      if (!numberOfVisibleComments) {
        numberOfVisibleComments = numberOfComments < 5 ? numberOfComments : 5;
      }

      toggleBodyOverflow('hidden');

      return {
        ...initialState,
        numberOfVisibleComments,
        data: activePicture,
      };
    }

    return {
      ...initialState,
    };
  };
}

function mapStateToProps(state) {
  return {
    activePicture: state.pictureDetails.activePicture,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setActivePicture,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PictureDetails);
