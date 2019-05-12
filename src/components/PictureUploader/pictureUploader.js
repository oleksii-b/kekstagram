import React from 'react';


export default function pictureUploader({onInputChange}) {
  return (
    <fieldset className='img-upload__start'>
      <label className='img-upload__label img-upload__control'>
        <input id='uploadFile' type='file' className='img-upload__input visually-hidden' onInput={onInputChange} name='filename' required />

        Загрузить
      </label>
    </fieldset>
  );
};
