import React from 'react';


export default function pictureDetails({isHidden, activePicture, visibleCommentSize, isLoadCommentBtnHidden, hideDialog, loadMoreComments}) {
  return (
    <section className={`big-picture overlay ${isHidden ? 'hidden' : ''}`} ref='overlay'>
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
            {visibleCommentSize} из <span className='comments-count'>{activePicture.comments.length}</span> комментариев
          </div>

          <ul className='social__comments'>
            {
              activePicture.comments.map((comment, index) => {
                return (
                  <li className={`social__comment ${index < visibleCommentSize ? '' : 'visually-hidden'}`} key={index}>
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
          <button type='button' className={`social__comments-loader comments-loader ${isLoadCommentBtnHidden ? 'visually-hidden' : ''}`} onClick={loadMoreComments}>
            Загрузить еще
          </button>

          {/* Форма для отправки комментария */}
          <div className='social__footer'>
            <img className='social__picture visually-hidden' src='img/avatar-6.svg' alt='Аватар комментатора фотографии' width='35' height='35' />

            <input type='text' className='social__footer-text' placeholder='Ваш комментарий...' />

            <button type='button' className='social__footer-btn' name='button'>
              Отправить
            </button>
          </div>
        </div>

        {/* Кнопка для выхода из полноэкранного просмотра изображения */}
        <button type='reset' className='big-picture__cancel cancel' onClick={hideDialog}>
          Закрыть
        </button>
      </div>
    </section>
  );
}
