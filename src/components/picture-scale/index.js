import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {setPictureScale} from 'store/actions';
import './index.scoped.less';

let scaleRef = null;

class PictureScale extends React.PureComponent {
  constructor(props) {
    super(props);

    this.scaleRange = {
      min: 25,
      max: 100,
      step: 25,
    };

    this.setScaleRef = (scale) => this.scaleRef = scale;
  }

  componentDidMount() {
    scaleRef = this.scaleRef;
  }

  setScale = (evt) => {
    const {name} = evt.target.dataset;
    const {max, min, step} = this.scaleRange;

    let {scale} = this.props;

    if (name === 'increment') {
      scale = scale < max ? scale + step : max
    }

    if (name === 'decrement') {
      scale = scale > min ? scale - step : min
    }

    this.props.setPictureScale(scale);
  }

  render() {
    if (scaleRef) {
      scaleRef.value = `${this.props.scale}%`;
    }

    return (
      <div className="scale">
        <button
          type="button"
          className="scale__control scale__control--smaller"
          onClick={this.setScale}
          data-name="decrement"
          disabled={this.props.scale === this.scaleRange.min}
        >
          Уменьшить
        </button>

        <input
          className="scale__control scale__control--value"
          ref={this.setScaleRef}
          defaultValue="100%"
          title="Image Scale"
          name="scale"
          readOnly
        />

        <button
          type="button"
          className="scale__control scale__control--bigger"
          onClick={this.setScale}
          data-name="increment"
          disabled={this.props.scale === this.scaleRange.max}
        >
          Увеличить
        </button>
      </div>
    );
  }
}

function mapStateToProps({pictureFormData: {scale}}) {
  return {
    scale,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setPictureScale,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PictureScale);
