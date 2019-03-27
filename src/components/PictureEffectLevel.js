import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';

import {setPictureEffectLevel} from 'store/actions/setPictureData';
const SliderWithTooltip = createSliderWithTooltip(Slider);

class PictureEffectLevel extends Component {
  state = {
    val: 20
  }

  componentDidMount = () => {
    document.addEventListener('keydown', (evt) => {
      if (evt.keyCode === 27) {
        this.resetPictureEditor();
      }
    });
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      val: nextProps.effectLevel
    })
  }

  onSliderChange = (val) => {
    this.props.setPictureEffectLevel(val);
  }

  render = () => {
    return (
      <Fragment>
        <input className='effect-level__value' type='number' name='effect-level' value={this.state.val} />

        <SliderWithTooltip
          value={this.state.val}
          onChange={this.onSliderChange}
          tipFormatter={value => `${value}%`}
        />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    effectLevel: state.pictureData.effectLevel
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setPictureEffectLevel: (effectLevel) => dispatch(setPictureEffectLevel(effectLevel))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PictureEffectLevel);
