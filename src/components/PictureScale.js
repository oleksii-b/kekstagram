import React, {PureComponent, Fragment} from 'react';
import {connect} from 'react-redux';

import {setPictureScale} from 'store/actions/pictureData';


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
    this.refs.scale.value = nextProps.scale + '%';
  }

  onScaleBtnClick = (evt) => {
    const name = evt.target.dataset.name,
      scaleRange = this.scaleRange;

    let scale = this.props.scale;

    if (name === 'increment') {
      scale = scale < scaleRange.max ? scale + scaleRange.step : scaleRange.max
    }

    if (name === 'decrement') {
      scale = scale > scaleRange.min ? scale - scaleRange.step : scaleRange.min
    }

    this.props.setPictureScale(scale);
  }

  render = () => {
    const scaleRange = this.scaleRange,
      scale = this.props.scale;

    return (
      <Fragment>
        <button type='button' className='scale__control scale__control--smaller' onClick={this.onScaleBtnClick} data-name='decrement' disabled={scale === scaleRange.min}>
          Уменьшить
        </button>

        <input className='scale__control scale__control--value' ref='scale' defaultValue='100%' title='Image Scale' name='scale' readOnly />

        <button type='button' className='scale__control scale__control--bigger' onClick={this.onScaleBtnClick} data-name='increment' disabled={scale === scaleRange.max}>
          Увеличить
        </button>
      </Fragment>
    );
  }
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
