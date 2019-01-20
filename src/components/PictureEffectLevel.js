import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';

import {setPictureEffectLevel} from 'store/actions/pictureData';


class PictureEffectLevel extends Component {
  onMouseDown = (evt) => {
    evt.preventDefault();

    const target = this.refs.pin;

    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      let pinOffsetLeft = target.offsetLeft - shift.x;

      if (pinOffsetLeft < 0) {
        pinOffsetLeft = 0;
      }

      if (pinOffsetLeft > target.offsetLeft * 5) {
        pinOffsetLeft = target.offsetLeft * 5;
      }

      target.style.left = pinOffsetLeft + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  render = () => {
    const picture = this.props.data;

    return (
      <Fragment>
        <input className='effect-level__value' type='number' name='effect-level' defaultValue='20' />

        <div className='effect-level__line' ref='line'>
          <div className='effect-level__pin' ref='pin' tabIndex='0' onMouseDown={this.onMouseDown}>
            Кнопка изменения глубины эффекта фотографии
          </div>

          <div className='effect-level__depth'>
            Глубина эффекта фотографии
          </div>
        </div>
      </Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setActivePicture: (effectLevel) => dispatch(setPictureEffectLevel(effectLevel))
  }
}

export default connect(null, mapDispatchToProps)(PictureEffectLevel);
