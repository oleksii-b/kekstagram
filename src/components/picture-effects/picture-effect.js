import React from 'react';
import cx from 'classnames';

import './picture-effect.scoped.less';

export default function PictureEffect({name = 'none', effect, title, setEffect, children}) {
  const isChecked = name === 'none';
  const getSetEffectHandler = (name) => {
    return () => setEffect(name);
  };

  return (
    <label
      className={cx({
        'effect': true,
        'active': effect === name,
      })}
      onClick={getSetEffectHandler(name)}
    >
      <input
        type="radio"
        className="visually-hidden"
        name="effect"
        value={name}
        defaultChecked={isChecked}
      />

      {children}

      {title}
    </label>
  );
}
