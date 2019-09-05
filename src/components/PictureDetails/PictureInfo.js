import React from 'react';


export default function PictureInfo({description, numberOfLikes, isLoadCommentBtnHidden, loadMoreComments, children}) {
  return (
    <div className='big-picture__social social'>
      <div className='social__header'>
        <img className='social__picture visually-hidden' src='img/avatar-1.svg' alt='Аватар автора фотографии' width='35' height='35' />

        <p className='social__caption'>
          {description}
        </p>

        <p className='social__likes'>
          Нравится <span className='likes-count'>{numberOfLikes}</span>
        </p>
      </div>

      {/* Комментарии к изображению */}
      {children}

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
  );
};
