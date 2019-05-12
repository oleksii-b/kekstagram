import React from 'react';


export default function pictureEffect({name, title, subtitle, isActive, onInputChange, defaultChecked}) {
  return (
    <label className={`effects__label ${isActive ? 'effects__label--active' : ''}`}>
      <input type='radio' className='effects__radio visually-hidden' name='effect' value={name} defaultChecked={defaultChecked} onChange={onInputChange} />

      <div className={`effects__preview effects__preview--${name}`}>
        {subtitle}
      </div>

      {title}
    </label>
  );
};
