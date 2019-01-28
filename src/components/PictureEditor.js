import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {pictureEditorHide, pictureEditorFieldValidate} from 'store/actions/pictureEditor';
import {setPictureHashtags, setPictureDescription, setDefaultValues} from 'store/actions/pictureData';
import PictureEffectLevel from './PictureEffectLevel';
import PictureEffectList from './PictureEffectList';
import PictureScale from './PictureScale';
import {toggleBodyOverflow} from 'services/utils';


class PictureEditor extends PureComponent {
  state = {
    isHashtagError: false
  }

  componentDidMount = () => {
    window.addEventListener('click', (evt) => {
      if (evt.target === this.refs.overlay) {
        this.resetPictureEditor();
      }
    });
  }

  componentWillReceiveProps = (nextProps) => {
    this.refs.hashtags.value = nextProps.hashtags;
    this.refs.description.value = nextProps.description;

    const isHashtagError = !nextProps.formFieldValidity.hashtags;

    if (isHashtagError) {
      const hashtags = nextProps.hashtags.trim();

      if (hashtags.length) {
        if (this.props.isLoaded === null) {
          if (hashtags.charAt(0) === '#') {
            this.setState({
              isHashtagError: hashtags.length > 1 ? isHashtagError : false
            });
          } else {
            this.setState({
              isHashtagError
            });
          }
        } else {
          this.setState({
            isHashtagError
          });
        }
      } else {
        this.setState({
          isHashtagError: false
        });
      }
    } else {
      this.setState({
        isHashtagError
      });
    }

    toggleBodyOverflow(nextProps.isHidden ? 'visible' : 'hidden');

    if (this.props.picture !== nextProps.picture) {
      this.refs.overlay.scrollTop = 0;
    }
  }

  resetPictureEditor = () => {
    this.refs.overlay.scrollTop = 0;

    this.props.pictureEditorHide();
    this.props.setDefaultValues();
  }

  onHashtagsChange = (evt) => {
    this.props.setPictureHashtags(evt.target.value);
    this.props.pictureEditorFieldValidate({
      hashtags: evt.target.value
    })
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
            <fieldset className="img-upload__effect-level  effect-level">
              <PictureEffectLevel />
            </fieldset>
          </div>

          {/* Наложение эффекта на изображение */}
          <fieldset className='img-upload__effects effects'>
            <PictureEffectList />
          </fieldset>

          {/* Добавление хэш-тегов и комментария к изображению */}
          <fieldset className='img-upload__text text'>
            <input className={`text__hashtags ${this.state.isHashtagError ? 'text__hashtags--error' : ''}`} ref='hashtags' name='hashtags' placeholder='#хэш-тег' onChange={this.onHashtagsChange} />

            {
              this.state.isHashtagError &&
              <div className='hidden'>
                Неверный формат
              </div>
            }

            <textarea className='text__description' ref='description' name='description' placeholder='Ваш комментарий...' onChange={this.onDescriptionChange}></textarea>
          </fieldset>

          {/* Кнопка для отправки данных на сервер */}
          <button type='submit' className='img-upload__submit'>
            Опубликовать
          </button>
        </div>
      </div>
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
    description: state.pictureData.description
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pictureEditorHide: () => dispatch(pictureEditorHide()),
    pictureEditorFieldValidate: (values) => dispatch(pictureEditorFieldValidate(values)),
    setPictureHashtags: (hashtags) => dispatch(setPictureHashtags(hashtags)),
    setPictureDescription: (description) => dispatch(setPictureDescription(description)),
    setDefaultValues: () => dispatch(setDefaultValues()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PictureEditor);
