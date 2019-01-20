import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as d3 from 'd3-fetch';


class PictureDetails extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      isHidden: true,
      isLoadCommentBtnHidden: false,
      visibleCommentSize: 0,
      data: {
        comments: []
      }
    };

    this.state = {
      ...this.initialState
    };
  }

  componentDidMount = () => {
    window.addEventListener('click', (evt) => {
      if (evt.target.id === 'pictureDetails') {
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
    this.setState({
      ...this.initialState,
      isHidden: true
    });
  }

  onLoadCommentBtnClick = () => {
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
    const activePicture = this.state.data;

    return (
      <section className={`big-picture overlay ${this.state.isHidden ? 'hidden' : ''}`} id='pictureDetails'>
        <h2 className='big-picture__title visually-hidden'>
          Просмотр фотографии
        </h2>

        <div className='big-picture__preview'>
          {/* Просмотр изображения */}
          <div className='big-picture__img'>
            <img src={activePicture.url} alt='' width='600' height='600' />
          </div>

          {/* Информация об изображении. Подпись, комментарии, количество лайков */}
          <div className='big-picture__social social'>
            <div className='social__header'>
              <img className='social__picture visually-hidden' src='img/avatar-1.svg' alt='Аватар автора фотографии' width='35' height='35' />

              <p className='social__caption'>
                {activePicture.description}
              </p>

              <p className='social__likes'>
                Нравится <span className='likes-count'>{activePicture.likes}</span>
              </p>
            </div>

            {/* Комментарии к изображению */}
            <div className='social__comment-count'>
              {this.state.visibleCommentSize} из <span className='comments-count'>{activePicture.comments.length}</span> комментариев
            </div>

            <ul className='social__comments'>
              {
                activePicture.comments.map((comment, index) => {
                  return (
                    <li className={`social__comment ${index < this.state.visibleCommentSize ? '' : 'visually-hidden'}`} key={index}>
                      <div className='social__picture' data-avatar={comment.avatar} title={comment.name}>
                        {comment.name}
                      </div>

                      <p className='social__text'>
                        {comment.message}
                      </p>
                    </li>
                  );
                })
              }
            </ul>

            {/* Кнопка для загрузки новой порции комментариев */}
            <button type='button' className={`social__comments-loader comments-loader ${this.state.isLoadCommentBtnHidden ? 'visually-hidden' : ''}`} onClick={this.onLoadCommentBtnClick}>
              Загрузить еще
            </button>

            {/* Форма для отправки комментария */}
            <div className='social__footer'>
              <img className='social__picture visually-hidden' src='img/avatar-6.svg' alt='Аватар комментатора фотографии' width='35' height='35' />

              <input type='text' className='social__footer-text' placeholder='Ваш комментарий...' />

              <button type='button' className='social__footer-btn' name='button'>Отправить</button>
            </div>
          </div>

          {/* Кнопка для выхода из полноэкранного просмотра изображения */}
          <button type='reset' className='big-picture__cancel cancel' onClick={this.hideDialog}>
            Закрыть
          </button>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    activePicture: state.pictureFetch.activePicture
  }
}

export default connect(mapStateToProps)(PictureDetails);
