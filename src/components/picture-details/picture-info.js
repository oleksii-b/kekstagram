import React from 'react';

import './picture-info.less';


export default function PictureInfo({description, numberOfLikes, children}) {
  return (
    <div className="PictureInfo social">
      <div className="social-header">
        <img
          className="social-picture visually-hidden"
          src="~img/avatar-1.svg"
          alt="Аватар автора фотографии"
          width="35"
          height="35"
         />

        <p className="social-caption">
          {description}
        </p>

        <p className="social-likes">
          Нравится <span className="likes-count">{numberOfLikes}</span>
        </p>
      </div>

      {/* Комментарии к изображению */}
      {children}

      {/* Форма для отправки комментария */}
      <div className="social-footer">
        <img
          className="social-picture visually-hidden"
          src="~img/avatar-6.svg"
          alt="Аватар комментатора фотографии"
          width="35"
          height="35"
        />

        <input type="text" className="social-footer__text" placeholder="Ваш комментарий..." />

        <button type="button" className="social-footer__btn" name="button">
          Отправить
        </button>
      </div>
    </div>
  );
};
