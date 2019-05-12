import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {setPictureScale} from 'store/actions/setPictureData';
import pictureScale from './pictureScale';


class PictureScale extends PureComponent {
  constructor(props) {
    super(props);

    this.scaleRange = {
      min: 25,
      max: 100,
      step: 25
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.scaleRef.value = nextProps.scale + '%';
  }

  setScale = (evt) => {
    const name = evt.target.dataset.name;
    const scaleRange = this.scaleRange;

    let scale = this.props.scale;

    if (name === 'increment') {
      scale = scale < scaleRange.max ? scale + scaleRange.step : scaleRange.max
    }

    if (name === 'decrement') {
      scale = scale > scaleRange.min ? scale - scaleRange.step : scaleRange.min
    }

    this.props.setPictureScale(scale);
  }

  setScaleRef = (scale) => this.scaleRef = scale;

  render = () => pictureScale({
    scale: this.props.scale,
    scaleRange: this.scaleRange,
    setScale: this.setScale,
    setScaleRef: this.setScaleRef
  });
}

function mapStateToProps(state) {
  return {
    scale: state.pictureData.scale
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setPictureScale: (scale) => dispatch(setPictureScale(scale))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PictureScale);
