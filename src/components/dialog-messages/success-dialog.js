
import React from 'react';
import cx from 'classnames';

export default function SuccessDialog({isLoaded, resetPostRequestStatus}) {
  return (
    <section
      className={cx({
        'alert-dialog': true,
        'visually-hidden': !isLoaded,
      })}
    >
      <div className="alert-dialog__inner">
        <h2 className="alert-dialog__title">
          Изображение успешно загружено
        </h2>

        <button type="button" className="alert-dialog__button" onClick={resetPostRequestStatus}>
          Круто!
        </button>
      </div>
    </section>
  );
}
