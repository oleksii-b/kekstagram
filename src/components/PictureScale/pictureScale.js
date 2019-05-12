import React, {Fragment} from 'react';


export default function pictureScale({scale, scaleRange, setScale, setScaleRef}) {
  return (
    <Fragment>
      <button type='button' className='scale__control scale__control--smaller' onClick={setScale} data-name='decrement' disabled={scale === scaleRange.min}>
        Уменьшить
      </button>

      <input className='scale__control scale__control--value' ref={setScaleRef} defaultValue='100%' title='Image Scale' name='scale' readOnly />

      <button type='button' className='scale__control scale__control--bigger' onClick={setScale} data-name='increment' disabled={scale === scaleRange.max}>
        Увеличить
      </button>
    </Fragment>
  );
}
