import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import {setPictureEffect} from 'store/actions/setPictureData';


class PictureEffect extends Component {
  onInputChange = (evt) => {
    if (evt.target.checked) {
      this.props.setPictureEffect(evt.target.value);
    }
  }

  render = () => {
    const defaultChecked = this.props.name === 'none' ? true : false;

    return (
      <label className={`effects__label ${this.props.effect === this.props.name ? 'effects__label--active' : ''}`}>
        <input type='radio' className='effects__radio visually-hidden' name='effect' value={this.props.name} defaultChecked={defaultChecked} onChange={this.onInputChange} />

        <div className={`effects__preview effects__preview--${this.props.name}`}>
          {this.props.subtitle}
        </div>

        {this.props.title}
      </label>
    );
  }
}

PictureEffect.defaultProps = {
  name: 'none'
}

function mapStateToProps(state) {
  return {
    effect: state.pictureData.effect
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setPictureEffect: (effect) => dispatch(setPictureEffect(effect))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PictureEffect);
