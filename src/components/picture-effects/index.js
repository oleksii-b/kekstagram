import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {setPictureEffect} from 'store/actions';
import PictureEffect from './picture-effect';
import PictureEffectPreview from './picture-effect-preview';
import effects from './effects';
import './index.scoped.less';

function PictureEffects({effect, src, setPictureEffect}) {
  return (
    <ul className="effects">
      {Object.keys(effects).map((it) => (
        <li className="effects__item" key={it}>
          <PictureEffect
            effect={effect}
            name={it}
            title={effects[it].title}
            setEffect={setPictureEffect}
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
      ))}
    </ul>
  );
}

function mapStateToProps(state) {
  const {src, effect} = state.pictureFormData;

  return {
    src,
    effect,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setPictureEffect,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PictureEffects);
