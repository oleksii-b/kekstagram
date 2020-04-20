import React from 'react';
import cx from 'classnames';

import './loading-dialog.scoped.less';

export default function LoadingDialog({isLoading}) {
  return (
    <div
      className={cx({
        'alert-dialog': true,
        'visually-hidden': !isLoading,
      })}
    >
      <div className='alert-dialog__inner'>
        Загружаем...
      </div>
    </div>
  );
}
