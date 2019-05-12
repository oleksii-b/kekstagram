import React from 'react';


export default function pictureMini({picture, url, setActivePicture}) {
  return (
    <a href={picture.url} className='picture' onClick={setActivePicture}>
      <img className='picture__img' src={url} width='182' height='182' alt={picture.description} />
      <p className='picture__info'>
        <span className='picture__comments'>{picture.comments.length}</span>
        <span className='picture__likes'>{picture.likes}</span>
      </p>
    </a>
  );
};
