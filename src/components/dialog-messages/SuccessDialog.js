
import React from 'react';
import cx from 'classnames';


export default function successDialog({isLoaded, resetPostRequestStatus}) {
  return (
    <section className={cx({
      'success': true,
      'visually-hidden': !isLoaded,
    })}>
      <div className="success__inner">
        <h2 className="success__title">
          Изображение успешно загружено
        </h2>

        <button type="button" className="success__button" onClick={resetPostRequestStatus}>
          Круто!
        </button>
      </div>
    </section>
  );
}
