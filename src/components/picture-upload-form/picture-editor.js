import React from 'react';
import {Field} from 'redux-form';
import cx from 'classnames';

import PictureEffects from 'components/picture-effects';
import PictureEffectLevel from 'components/picture-effect-level';
import PictureScale from 'components/picture-scale';
import FormGroup from 'components/ui/FormGroup';
import {correctHashtag} from 'utils/validators';
import './picture-editor.scoped.less';

export default function PictureEditor(props) {
  const {
    isHidden,
    hide,
    effectName,
    setOverlayRef,
    setPictureHashtags,
    children,
  } = props;

  const isSliderActive = effectName !== 'none';

  const onDescriptionChange = ({target: {value}}) =>
    setPictureHashtags(value);

  return (
    <div
      ref={setOverlayRef}
      className={cx({
        'img-upload__overlay overlay': true,
        'hidden': isHidden,
      })}
    >
      <div className="img-upload__wrapper">
        <div className="preview-container">
          <button type="reset" className="btn-cancel cancel" onClick={hide}>
            Закрыть
          </button>

          {/* Изменение размера изображения */}
          <fieldset className="scale">
            <PictureScale />
          </fieldset>

          {/* Предварительный просмотр изображения */}
          {children}

          {/* Изменение глубины эффекта, накладываемого на изображение */}
          {isSliderActive && (
            <fieldset className="effect-level">
              <PictureEffectLevel />
            </fieldset>
          )}
        </div>

        {/* Наложение эффекта на изображение */}
        <fieldset>
          <PictureEffects />
        </fieldset>

        {/* Добавление хэш-тегов и комментария к изображению */}
        <fieldset className="uploader-fieldset">
          <Field
            name="hashtags"
            component={FormGroup}
            type="text"
            placeholder="#хэш-тег"
            groupClass="form-group"
            controlClass="input-control"
            errorClass="input-control--error"
            validate={[correctHashtag]}
          />

          <textarea
            className="textarea-control"
            name="description"
            placeholder="Ваш комментарий..."
            onChange={onDescriptionChange}
          />
        </fieldset>

        {/* Кнопка для отправки данных на сервер */}
        <button type="submit" className="btn-submit">
          Опубликовать
        </button>
      </div>
    </div>
  );
}
