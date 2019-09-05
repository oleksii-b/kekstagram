import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as d3 from 'd3-fetch';

import {setActivePicture} from 'store/actions/pictureFetch';
import {toggleBodyOverflow} from 'utils/helpers';
import PictureInfo from './PictureInfo';
import Comments from './Comments';


const initialState = {
  isLoadCommentBtnHidden: false,
  numberOfVisibleComments: 0,
  data: {
    url: null,
    comments: [],
  },
};

class PictureDetails extends React.Component {
  state = {
    ...initialState,
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
        isLoadCommentBtnHidden: numberOfComments <= numberOfVisibleComments,
        data: activePicture,
      };
    }

    return {
      ...initialState,
    };
  };

  overlayRef = React.createRef();

  componentDidMount = () => {
    window.addEventListener('click', (evt) => {
      if (evt.target === this.overlayRef.current) {
        this.hideDialog();
      }
    });

    document.addEventListener('keydown', (evt) => {
      if (evt.keyCode === 27) {
        this.hideDialog();
      }
    });
  };

  componentDidUpdate = () => {
    for (let avatarContainer of document.querySelectorAll('[data-avatar]')) {
      d3.svg(`https://raw.githubusercontent.com/oleksii-b/kekstagram/master/assets/img/${avatarContainer.dataset.avatar}`)
        .then(data => {
          const oSerializer = new XMLSerializer();

          avatarContainer.innerHTML = oSerializer.serializeToString(data);
        });
    }
  };

  hideDialog = () => {
    this.overlayRef.current.scrollTop = 0;

    toggleBodyOverflow('visible');
    this.props.setActivePicture(null);
  };

  loadMoreComments = () => {
    let numberOfComments = this.state.data.comments.length;
    let numberOfVisibleComments = this.state.numberOfVisibleComments + 5;

    if (numberOfVisibleComments > numberOfComments) {
      numberOfVisibleComments = numberOfComments;
    }

    this.setState({
      numberOfVisibleComments,
      isLoadCommentBtnHidden: numberOfComments <= numberOfVisibleComments
    });
  };

  render = () => {
    const {numberOfVisibleComments, isLoadCommentBtnHidden, data} = this.state;
    const {url, description, likes, comments} = data;

    return (
      <section className={`big-picture overlay ${url ? '' : 'hidden'}`} ref={this.overlayRef}>
        <h2 className='big-picture__title visually-hidden'>
          Просмотр фотографии
        </h2>

        <div className='big-picture__preview'>
          {/* Просмотр изображения */}
          <div className='big-picture__img'>
            <img src={url} alt='' width='600' height='600' />
          </div>

          {/* Информация об изображении. Подпись, комментарии, количество лайков */}
          <PictureInfo
            description={description}
            numberOfLikes={likes}
            isLoadCommentBtnHidden={isLoadCommentBtnHidden}
            loadMoreComments={this.loadMoreComments}
          >
            {/* Комментарии к изображению */}
            <Comments
              listOfComments={comments}
              numberOfVisibleComments={numberOfVisibleComments}
            />
          </PictureInfo>

          {/* Кнопка для выхода из полноэкранного просмотра изображения */}
          <button type='reset' className='big-picture__cancel cancel' onClick={this.hideDialog}>
            Закрыть
          </button>
        </div>
      </section>
    );
  };
};

function mapStateToProps(state) {
  return {
    activePicture: state.pictureFetch.activePicture,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setActivePicture,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PictureDetails);
