import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {setPictureEffect} from 'store/actions';
import PictureEffect from './picture-effect';
import PictureEffectPreview from './picture-effect-preview';
import effects from './effects';


class PictureEffects extends React.Component {
  setEffect = (effect) => {
    this.props.setPictureEffect(effect);
  };

  render = () => {
    const {effect, src} = this.props;

    return (
      <ul className="effects__list">
        {
          Object.keys(effects).map((it) => {
            return (
              <li className="effects__item" key={it}>
                <PictureEffect
                  effect={effect}
                  name={it}
                  title={effects[it].title}
                  setEffect={this.setEffect}
                >
                  <PictureEffectPreview
                    className="effect-preview"
                    effectName={it}
                    effectLevel={100}
                    src={src}
                  >
                    {effects[it].subtitle}
                  </PictureEffectPreview>
                </PictureEffect>
              </li>
            );
          })
        }
      </ul>
    );
  };
};

function mapStateToProps(state) {
  const {src, effect} = state.pictureFormData;

  return {
    src,
    effect,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setPictureEffect,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PictureEffects);
