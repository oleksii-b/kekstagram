import React, {Component} from 'react';
import {connect} from 'react-redux';

import {setPictureEffect} from 'store/actions/setPictureData';
import pictureEffect from './pictureEffect';


class PictureEffect extends Component {
  onInputChange = (evt) => {
    if (evt.target.checked) {
      this.props.setPictureEffect(evt.target.value);
    }
  }

  render = () => {
    const defaultChecked = this.props.name === 'none' ? true : false;
    const {effect, name, title, subtitle} = this.props;

    return pictureEffect({
      name,
      title,
      subtitle,
      isActive: effect === name,
      onInputChange: this.onInputChange,
      defaultChecked
    });
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
