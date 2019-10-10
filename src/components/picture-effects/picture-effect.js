import React from 'react';
import cx from 'classnames';

import PictureEffectPreview from './picture-effect-preview';


export default function PictureEffect({name = 'none', effect, title, subtitle, setEffect}) {
  const defaultChecked = name === 'none' ? true : false;

  return (
    <label
      className={cx({
        'effects__label': true,
        'effects__label--active': effect === name,
      })}
      onClick={setEffect.bind(null, name)}
    >
      <input
        type="radio"
        className="effects__radio visually-hidden"
        name="effect"
        value={name}
        defaultChecked={defaultChecked}
      />

      <PictureEffectPreview
        className="effects__preview"
        effectName={name}
        effectLevel={100}
      >
        {subtitle}
      </PictureEffectPreview>

      {title}
    </label>
  );
};
