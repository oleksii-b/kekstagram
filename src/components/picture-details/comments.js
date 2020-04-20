import React from 'react';
import cx from 'classnames';

import './comments.scoped.less';

export default function Comments({listOfComments, numberOfVisibleComments, loadMoreComments}) {
  const numberOfComments = listOfComments.length;

  return (
    <>
      <div className="comment-count">
        {numberOfVisibleComments} из <span className="comments-count">{numberOfComments}</span> комментариев
      </div>

      <ul className="comments">
        {listOfComments.map((comment, index) => {
          return (
            <li
              className={cx({
                'comments__item': true,
                'visually-hidden': index >= numberOfVisibleComments,
              })}
              key={index}
            >
              <div className="avatar" data-avatar={comment.avatar} title={comment.name}>
                {comment.name}
              </div>

              <p className="comment-message">
                {comment.message}
              </p>
            </li>
          );
        })}
      </ul>

      {/* Кнопка для загрузки новой порции комментариев */}
      <button
        type="button"
        onClick={loadMoreComments}
        className={cx({
          'spinner': true,
          'visually-hidden': numberOfComments <= numberOfVisibleComments,
        })}
      >
        Загрузить еще
      </button>
    </>
  );
}
