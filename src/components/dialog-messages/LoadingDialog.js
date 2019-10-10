import React from 'react';


export default function LoadingDialog({isLoading}) {
  return (
    <div className={`loading ${isLoading ? '' : 'visually-hidden'}`}>
      <div className='loading__inner'>
        Загружаем...
      </div>
    </div>
  );
}
