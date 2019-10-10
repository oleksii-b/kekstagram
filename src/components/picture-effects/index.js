import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {setPictureEffect} from 'store/actions';
import PictureEffect from './picture-effect';
import effects from './effects';


class PictureEffects extends React.Component {
  setEffect = (effect) => {
    this.props.setPictureEffect(effect);
  };

  render = () => {
    const {effect} = this.props;

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
                  subtitle={effects[it].subtitle}
                  setEffect={this.setEffect}
                />
              </li>
            );
          })
        }
      </ul>
    );
  };
};

function mapStateToProps(state) {
  return {
    effect: state.pictureFormData.effect,
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
