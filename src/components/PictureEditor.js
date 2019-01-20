import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {pictureEditorHide, pictureEditorShow, pictureEditorFieldValidate} from 'store/actions/pictureEditor';
import {setPictureScale, setPictureHashtags, setPictureDescription, setDefaultValues} from 'store/actions/pictureData';
import PictureEffectList from './PictureEffectList';


class PictureEditor extends PureComponent {
  state = {
    isHashtagError: false
  }

  componentDidMount = () => {
    window.addEventListener('click', (evt) => {
      if (evt.target.id === 'pictureEditor') {
        this.resetPictureEditor();
      }
    });

    document.addEventListener('keydown', (evt) => {
      if (evt.keyCode === 27) {
        this.resetPictureEditor();
      }
    });
  }

  componentWillReceiveProps = (nextProps) => {
    this.refs.scale.value = nextProps.scale + '%';
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
  }

  resetPictureEditor = () => {
    this.props.pictureEditorHide();
    this.props.setDefaultValues();
  }

  onScaleBtnClick = (evt) => {
    const name = evt.target.dataset.name;
    
    let scale = this.props.scale;

    if (name === 'increment') {
      scale = scale < 100 ? scale + 25 : 100
    }

    if (name === 'decrement') {
      scale = scale > 25 ? scale - 25 : 25
    }

    this.props.setPictureScale(scale);
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
      <div className={`img-upload__overlay ${this.props.isHidden ? 'hidden' : ''}`} id='pictureEditor'>
        <div className='img-upload__wrapper'>
          <div className='img-upload__preview-container'>
            <button type='reset' className='img-upload__cancel cancel' onClick={this.onHidePictureEditorBtnClick}>
              Закрыть
            </button>

            {/* Изменение размера изображения */}
            <fieldset className='img-upload__scale scale'>
              <button type='button' className='scale__control scale__control--smaller' onClick={this.onScaleBtnClick} data-name='decrement'>
                Уменьшить
              </button>

              <input className='scale__control scale__control--value' ref='scale' defaultValue='100%' title='Image Scale' name='scale' readOnly />

              <button type='button' className='scale__control scale__control--bigger' onClick={this.onScaleBtnClick} data-name='increment'>
                Увеличить
              </button>
            </fieldset>

            {/* Предварительный просмотр изображения */}
            <div className='img-upload__preview'>
              <img style={imgStyles} src={this.props.picture} className={`effects__preview--${this.props.effect}`} alt='Предварительный просмотр фотографии' />
            </div>
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
    hashtags: state.pictureData.hashtags,
    description: state.pictureData.description
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pictureEditorHide: () => dispatch(pictureEditorHide()),
    pictureEditorShow: () => dispatch(pictureEditorShow()),
    pictureEditorFieldValidate: (values) => dispatch(pictureEditorFieldValidate(values)),
    setPictureScale: (scale) => dispatch(setPictureScale(scale)),
    setPictureHashtags: (hashtags) => dispatch(setPictureHashtags(hashtags)),
    setPictureDescription: (description) => dispatch(setPictureDescription(description)),
    setDefaultValues: () => dispatch(setDefaultValues()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PictureEditor);
