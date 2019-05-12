import React, {Fragment} from 'react';
import Slider, {createSliderWithTooltip} from 'rc-slider';
import 'rc-slider/assets/index.css';


const SliderWithTooltip = createSliderWithTooltip(Slider);

export default function pictureEffectLevel({level, onSliderChange}) {
  return (
    <Fragment>
      <input className='effect-level__value' type='number' name='effect-level' value={level} />

      <SliderWithTooltip
        value={level}
        onChange={onSliderChange}
        tipFormatter={value => `${value}%`}
      />
    </Fragment>
  );
};
