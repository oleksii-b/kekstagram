import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Slider, {createSliderWithTooltip} from 'rc-slider';
import 'rc-slider/assets/index.css';

import {setPictureEffectLevel} from 'store/actions/setPictureData';


const SliderWithTooltip = createSliderWithTooltip(Slider);

class PictureEffectLevel extends React.Component {
  state = {
    val: 20,
  };

  componentDidMount = () => {
    document.addEventListener('keydown', (evt) => {
      if (evt.keyCode === 27) {
        this.resetPictureEditor();
      }
    });
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      val: nextProps.effectLevel
    });
  };

  onSliderChange = (val) => {
    this.props.setPictureEffectLevel(val);
  };

  render = () => {
    const {val} = this.state;

    return (
      <>
        <input
          className='effect-level__value' type='number' name='effect-level'
          value={val}
        />

        <SliderWithTooltip
          value={val}
          onChange={this.onSliderChange}
          tipFormatter={value => `${value}%`}
        />
      </>
    );
  };
};

function mapStateToProps(state) {
  return {
    effectLevel: state.pictureData.effectLevel,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setPictureEffectLevel,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PictureEffectLevel);
