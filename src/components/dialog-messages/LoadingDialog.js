import React from 'react';
import cx from 'classnames';


export default function LoadingDialog({isLoading}) {
  return (
    <div className={cx({
      'loading': true,
      'visually-hidden': !isLoading,
    })}>
      <div className='loading__inner'>
        Загружаем...
      </div>
    </div>
  );
}
