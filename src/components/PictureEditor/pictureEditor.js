import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';

import PictureEffectLevel from 'components/PictureEffectLevel';
import PictureEffectList from 'components/PictureEffectList';
import PictureScale from 'components/PictureScale';
import FormGroup from 'components/UI/FormGroup';
import {correctHashtag} from 'services/validation';
import PicturePreview from './PicturePreview';


export default function pictureEditor({pictureUploader, isHidden, hide, picture, scale, effectName, setOverlayRef, setPictureHashtags, submitForm}) {
  const onDescriptionChange = (evt) => setPictureHashtags(evt.target.value);

  return (
    <form action='https://js.dump.academy/kekstagram' className='img-upload__form' id='upload-select-image' method='post' encType='multipart/form-data' autoComplete='off' onSubmit={submitForm}>
      {pictureUploader}

      <div className={`img-upload__overlay overlay ${isHidden ? 'hidden' : ''}`} ref={setOverlayRef}>
        <div className='img-upload__wrapper'>
          <div className='img-upload__preview-container'>
            <button type='reset' className='img-upload__cancel cancel' onClick={hide}>
              Закрыть
            </button>

            {/* Изменение размера изображения */}
            <fieldset className='img-upload__scale scale'>
              <PictureScale />
            </fieldset>

            {/* Предварительный просмотр изображения */}
            <div className='img-upload__preview'>
              <PicturePreview
                scale={scale}
                src={picture} 
                className={`effects__preview--${effectName}`}
                alt='Предварительный просмотр фотографии'
              />
            </div>

            {/* Изменение глубины эффекта, накладываемого на изображение */}
            <fieldset className={`img-upload__effect-level effect-level ${effectName === 'none' ? 'hidden' : ''}`}>
              <PictureEffectLevel />
            </fieldset>
          </div>

          {/* Наложение эффекта на изображение */}
          <fieldset className='img-upload__effects effects'>
            <PictureEffectList />
          </fieldset>

          {/* Добавление хэш-тегов и комментария к изображению */}
          <fieldset className='img-upload__text text'>
            <Field
              name='hashtags'
              component={FormGroup}
              type='text'
              placeholder='#хэш-тег'
              groupClass='form-group'
              controlClass='text__hashtags'
              errorClass='text__hashtags--error'
              validate={[correctHashtag]}
            />

            <textarea className='text__description' name='description' placeholder='Ваш комментарий...' onChange={onDescriptionChange} />
          </fieldset>

          {/* Кнопка для отправки данных на сервер */}
          <button type='submit' className='img-upload__submit'>
            Опубликовать
          </button>
        </div>
      </div>
    </form>
  );
}
