import React from 'react';
import cx from 'classnames';

import './error-dialog.scoped.less';

export default function ErrorDialog({isLoaded, fetchAgain, uploadAnotherFile}) {
  return (
    <section
      className={cx({
        'alert-dialog': true,
        'visually-hidden': isLoaded !== false,
      })}
    >
      <div className="alert-dialog__inner">
        <h2 className="alert-dialog__title">
          Ошибка загрузки файла
        </h2>

        <div className="alert-dialog__buttons">
          <button type="button" className="alert-dialog__button" onClick={fetchAgain}>
            Попробовать снова
          </button>

          <button type="button" className="alert-dialog__button" onClick={uploadAnotherFile}>
            Загрузить другой файл
          </button>
        </div>
      </div>
    </section>
  );
}
