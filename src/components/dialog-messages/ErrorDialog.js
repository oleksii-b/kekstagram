import React from 'react';
import cx from 'classnames';


export default function ErrorDialog({isLoaded, fetchAgain, uploadAnotherFile}) {
  return (
    <section className={cx({
      'error': true,
      'visually-hidden': isLoaded !== false,
    })}>
      <div className="error__inner">
        <h2 className="error__title">
          Ошибка загрузки файла
        </h2>

        <div className="error__buttons">
          <button type="button" className="error__button" onClick={fetchAgain}>
            Попробовать снова
          </button>

          <button type="button" className="error__button" onClick={uploadAnotherFile}>
            Загрузить другой файл
          </button>
        </div>
      </div>
    </section>
  );
}
