import React, {Component} from 'react';
import {connect} from 'react-redux';

import PictureEffect from './PictureEffect';


const effects = {
  none: {
    subtitle: 'Превью фото без эффекта',
    title: 'Оригинал'
  },

  chrome: {
    subtitle: 'Превью эффекта Хром',
    title: 'Хром'
  },

  sepia: {
    subtitle: 'Превью эффекта Сепия',
    title: 'Сепия'
  },

  marvin: {
    subtitle: 'Превью эффекта Марвин',
    title: 'Марвин'
  },

  phobos: {
    subtitle: 'Превью эффекта Фобос',
    title: 'Фобос'
  },

  heat: {
    subtitle: 'Превью эффекта Зной',
    title: 'Зной'
  }
};

class PictureEffectList extends Component {
  getItems = () => {
    let elements = [];

    for (let effectName in effects) {
      elements.push(
        <li className={`effects__item ${this.props.effect === effectName ? 'effects__item--active' : ''}`} key={effectName}>
          <PictureEffect
            name={effectName}
            title={effects[effectName].title}
            subtitle={effects[effectName].subtitle}
          />
        </li>
      );
    }

    return [...elements];
  }

  render = () => {
    const containerClass = 'img-upload__overlay' + (this.props.visibility ? '' : ' hidden');

    return (
      <ul className="effects__list">
        {this.getItems()}
      </ul>
    );
  }
};

function mapStateToProps(state) {
  return {
    effect: state.pictureData.effect
  }
}

export default connect(mapStateToProps)(PictureEffectList);
