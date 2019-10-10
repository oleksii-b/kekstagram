import React from 'react';
import cx from 'classnames';

import './comments.less';


export default function Comments({listOfComments, numberOfVisibleComments, loadMoreComments}) {
  const numberOfComments = listOfComments.length;

  return (
    <div class="Comments">
      <div className='social__comment-count'>
        {numberOfVisibleComments} из <span className="comments-count">{numberOfComments}</span> комментариев
      </div>

      <ul className="social__comments">
        {
          listOfComments.map((comment, index) => {
            return (
              <li
                className={cx({
                  'social__comment': true,
                  'visually-hidden': index >= numberOfVisibleComments,
                })}
                key={index}
              >
                <div className="social__picture" data-avatar={comment.avatar} title={comment.name}>
                  {comment.name}
                </div>

                <p className="social__text">
                  {comment.message}
                </p>
              </li>
            );
          })
        }
      </ul>

      {/* Кнопка для загрузки новой порции комментариев */}
      <button
        type="button"
        onClick={loadMoreComments}
        className={cx({
          'social__comments-loader': true,
          'comments-loader': true,
          'visually-hidden': numberOfComments <= numberOfVisibleComments,
        })}
      >
        Загрузить еще
      </button>
    </div>
  );
};
