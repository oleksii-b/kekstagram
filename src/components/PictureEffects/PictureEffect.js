import React from 'react';

import PictureEffectPreview from './PictureEffectPreview';


export default function PictureEffect({effect, name, title, subtitle, setEffect}) {
  const defaultChecked = name === 'none' ? true : false;

  return (
    <label
      className={`effects__label ${effect === name ? 'effects__label--active' : ''}`}
      onClick={setEffect.bind(null, name)}
    >
      <input
        type='radio'
        className='effects__radio visually-hidden'
        name='effect'
        value={name}
        defaultChecked={defaultChecked}
      />

      <PictureEffectPreview
        className='effects__preview'
        effectName={name}
        effectLevel={100}
      >
        {subtitle}
      </PictureEffectPreview>

      {title}
    </label>
  );
}

PictureEffect.defaultProps = {
  name: 'none',
};
