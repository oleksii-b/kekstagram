import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Slider from 'rc-slider';

import {setPictureEffectLevel} from 'store/actions';
import './index.less';


class PictureEffectLevel extends React.PureComponent {
  state = {
    val: 0,
  };

  timeout = null;

  onSliderChange = (val) => {
    this.setState({
      val,
    }, () => {
      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => this.props.setPictureEffectLevel(val), 200);
    });
  };

  render = () => {
    const {val} = this.state;

    return (
      <div className="PictureEffectLevel">
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
      </div>
    );
  };

  static getDerivedStateFromProps(nextProps) {
    return {
      val: nextProps.effectLevel,
    };
  };
};

function mapStateToProps(state) {
  return {
    effectLevel: state.pictureFormData.effectLevel,
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
