import React from 'react';
import cx from 'classnames';

import './picture-effect.less';


export default function PictureEffect({name = 'none', effect, title, setEffect, children}) {
  const defaultChecked = name === 'none' ? true : false;

  return (
    <label
      className={cx({
        'PictureEffect': true,
        'active': effect === name,
      })}
      onClick={setEffect.bind(null, name)}
    >
      <input
        type="radio"
        className="visually-hidden"
        name="effect"
        value={name}
        defaultChecked={defaultChecked}
      />

      {children}
      {title}
    </label>
  );
};
