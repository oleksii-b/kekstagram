import React, {Component} from 'react';

import PictureEffect from 'components/PictureEffect';


export default function pictureEffectList({effect}) {
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

  return (
    <ul className="effects__list">
      {
        Object.keys(effects).map((effectName) => {
          return (
            <li className={`effects__item ${effect === effectName ? 'effects__item--active' : ''}`} key={effectName}>
              <PictureEffect
                name={effectName}
                title={effects[effectName].title}
                subtitle={effects[effectName].subtitle}
              />
            </li>
          );
        })
      }
    </ul>
  );
};
