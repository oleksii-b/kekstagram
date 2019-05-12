import React from 'react';

import PictureUploader from 'components/PictureUploader';
import PictureEditor from 'components/PictureEditor';
import PictureMini from 'components/PictureMini';


export default function pictureList({picture, pictures, onUploaderValueChange}) {
  return (
    <section className='pictures container'>
      <h2 className='pictures__title visually-hidden'>
        Фотографии других пользователей
      </h2>

      {/* Поле для загрузки нового изображения на сайт */}
      <section className='img-upload'>
        <div className='img-upload__wrapper'>
          <h2 className='img-upload__title visually-hidden'>
            Загрузка фотографии
          </h2>

          <PictureEditor
            picture={picture}
          >
            <PictureUploader
              onInputChange={onUploaderValueChange}
            />
          </PictureEditor>
        </div>
      </section>

      {
        !!pictures.length
        &&
          pictures.map((picture) => {
            return (
              <PictureMini
                key={picture.url}
                data={picture}
              />
            );
          })
      }
    </section>
  );
}
