import React from 'react';


export default function loadingDialog({isLoading}) {
  return (
    <div className={`loading ${isLoading ? '' : 'visually-hidden'}`}>
      <div className='loading__inner'>
        Загружаем...
      </div>
    </div>
  );
}
