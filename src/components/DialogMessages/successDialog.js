
import React from 'react';


export default function successDialog({isLoaded, resetFetchStatus}) {
  return (
    <section className={`success ${isLoaded === true ? '' : 'visually-hidden'}`}>
      <div className="success__inner">
        <h2 className="success__title">
          Изображение успешно загружено
        </h2>

        <button type="button" className="success__button" onClick={resetFetchStatus}>
          Круто!
        </button>
      </div>
    </section>
  );
}
