import React from 'react';


export default function Comments({listOfComments, numberOfVisibleComments}) {
  return (
    <>
      <div className='social__comment-count'>
        {numberOfVisibleComments} из <span className='comments-count'>{listOfComments.length}</span> комментариев
      </div>

      <ul className='social__comments'>
        {
          listOfComments.map((comment, index) => {
            return (
              <li className={`social__comment ${index < numberOfVisibleComments ? '' : 'visually-hidden'}`} key={index}>
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
    </>
  );
};
