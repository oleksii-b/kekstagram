import React, {Component} from 'react';
import {connect} from 'react-redux';

import {setPictureEffectLevel} from 'store/actions/setPictureData';
import pictureEffectLevel from './pictureEffectLevel';


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

  render = () => pictureEffectLevel({
    level: this.state.val,
    onSliderChange: this.onSliderChange
  });
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
