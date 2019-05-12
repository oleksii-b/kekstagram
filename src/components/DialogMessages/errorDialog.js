import React from 'react';


export default function errorDialog({isLoaded, onTryAgainBtnClick, onUploadAnotherFileBtnClick}) {
  return (
    <section className={`error ${isLoaded === false ? '' : 'visually-hidden'}`}>
      <div className="error__inner">
        <h2 className="error__title">
          Ошибка загрузки файла
        </h2>

        <div className="error__buttons">
          <button type="button" className="error__button" onClick={onTryAgainBtnClick}>
            Попробовать снова
          </button>

          <button type="button" className="error__button" onClick={onUploadAnotherFileBtnClick}>
            Загрузить другой файл
          </button>
        </div>
      </div>
    </section>
  );
}
