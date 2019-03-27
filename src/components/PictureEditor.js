import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';

import {postPicture} from 'store/actions/pictureFetch';
import {pictureEditorHide} from 'store/actions/pictureEditor';
import {setPictureHashtags, setPictureDescription, setDefaultValues} from 'store/actions/setPictureData';
import PictureEffectLevel from './PictureEffectLevel';
import PictureEffectList from './PictureEffectList';
import PictureScale from './PictureScale';
import FormGroup from './FormGroup';
import {toggleBodyOverflow} from 'services/utils';
import {correctHashtag} from 'services/validation';


class PictureEditor extends Component {
  componentDidMount = () => {
    this.props.initialize();

    window.addEventListener('click', (evt) => {
      if (evt.target === this.refs.overlay) {
        this.resetPictureEditor();
      }
    });
  }

  componentWillReceiveProps = (nextProps) => {
    toggleBodyOverflow(nextProps.isHidden ? 'visible' : 'hidden');

    if (this.props.picture !== nextProps.picture) {
      this.refs.overlay.scrollTop = 0;

      this.props.initialize();
    }
  }

  onFormSubit = (evt) => {
    evt.preventDefault();
    this.props.handleSubmit();
    this.props.postPicture(new FormData(evt.target));
  }

  resetPictureEditor = () => {
    this.refs.overlay.scrollTop = 0;

    this.props.pictureEditorHide();
    this.props.setDefaultValues();
    this.props.initialize();
  }

  onHashtagsChange = (evt) => {
    this.props.setPictureHashtags(evt.target.value);
  }

  onDescriptionChange = (evt) => {
    this.props.setPictureDescription(evt.target.value);
  }

  onHidePictureEditorBtnClick = () => {
    this.resetPictureEditor();
  }

  render = () => {
    const imgStyles = {
      transform: `scale(${this.props.scale / 100})`
    };

    return (
    <form action='https://js.dump.academy/kekstagram' className='img-upload__form' id='upload-select-image' method='post' encType='multipart/form-data' autoComplete='off' onSubmit={this.onFormSubit}>
      {this.props.children}

      <div className={`img-upload__overlay overlay ${this.props.isHidden ? 'hidden' : ''}`} ref='overlay'>
        <div className='img-upload__wrapper'>
          <div className='img-upload__preview-container'>
            <button type='reset' className='img-upload__cancel cancel' onClick={this.onHidePictureEditorBtnClick}>
              Закрыть
            </button>

            {/* Изменение размера изображения */}
            <fieldset className='img-upload__scale scale'>
              <PictureScale />
            </fieldset>

            {/* Предварительный просмотр изображения */}
            <div className='img-upload__preview'>
              <img style={imgStyles} src={this.props.picture} className={`effects__preview--${this.props.effect}`} alt='Предварительный просмотр фотографии' />
            </div>

            {/* Изменение глубины эффекта, накладываемого на изображение */}
            <fieldset className={`img-upload__effect-level effect-level ${this.props.effect === 'none' ? 'hidden' : ''}`}>
              <PictureEffectLevel />
            </fieldset>
          </div>

          {/* Наложение эффекта на изображение */}
          <fieldset className='img-upload__effects effects'>
            <PictureEffectList />
          </fieldset>

          {/* Добавление хэш-тегов и комментария к изображению */}
          <fieldset className='img-upload__text text'>
            <Field
              name='hashtags'
              component={FormGroup}
              type='text'
              placeholder='#хэш-тег'
              groupClass='form-group'
              controlClass='text__hashtags'
              errorClass='text__hashtags--error'
              validate={[correctHashtag]}
            />

            <textarea className='text__description' ref='description' name='description' placeholder='Ваш комментарий...' onChange={this.onDescriptionChange}></textarea>
          </fieldset>

          {/* Кнопка для отправки данных на сервер */}
          <button type='submit' className='img-upload__submit'>
            Опубликовать
          </button>
        </div>
      </div>
    </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    isHidden: state.pictureEditor.isHidden,
    formFieldValidity: state.pictureEditor.formFieldValidity,
    isLoaded: state.pictureFetch.isLoaded,
    scale: state.pictureData.scale,
    effect: state.pictureData.effect,
    effectLevel: state.pictureData.effectLevel,
    hashtags: state.pictureData.hashtags,
    description: state.pictureData.description,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    postPicture: (data) => dispatch(postPicture(data)),
    pictureEditorHide: () => dispatch(pictureEditorHide()),
    setPictureHashtags: (hashtags) => dispatch(setPictureHashtags(hashtags)),
    setPictureDescription: (description) => dispatch(setPictureDescription(description)),
    setDefaultValues: () => dispatch(setDefaultValues())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: 'form',
    enableReinitialize: true,
    onSubmit: () => void(0)
  })(PictureEditor)
);
