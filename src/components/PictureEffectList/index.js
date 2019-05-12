import React, {Component} from 'react';
import {connect} from 'react-redux';

import pictureEffectList from './pictureEffectList'


class PictureEffectList extends Component {
  render = () => {
    const containerClass = 'img-upload__overlay' + (this.props.visibility ? '' : ' hidden');

    return pictureEffectList({
      effect: this.props.effect
    });
  }
};

function mapStateToProps(state) {
  return {
    effect: state.pictureData.effect
  }
}

export default connect(mapStateToProps)(PictureEffectList);
