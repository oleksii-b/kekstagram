import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Slider from 'rc-slider';

import {setPictureEffectLevel} from 'store/actions';

class PictureEffectLevel extends React.PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    const {effectLevel} = nextProps;

    let state = {};

    if (effectLevel !== prevState.val) {
      state = {
        ...state,
        val: nextProps.effectLevel,
      };
    }

    return Object.keys(state).length ? state : null;
  }

  state = {
    val: 0,
  }

  timeout = null;

  onSliderChange = (val) => {
    this.setState({
      val,
    }, () => {
      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => this.props.setPictureEffectLevel(val), 0);
    });
  }

  render() {
    const {val} = this.state;

    return (
      <>
        <input
          className="hidden"
          type="number"
          name="effect-level"
          defaultValue={val}
        />

        <Slider
          defaultValue={val}
          onChange={this.onSliderChange}
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    effectLevel: state.pictureFormData.effectLevel,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setPictureEffectLevel,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PictureEffectLevel);
