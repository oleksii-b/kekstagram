import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import {resetFetchStatus} from 'store/actions/pictureFetch';
import {pictureEditorHide, pictureEditorShow} from 'store/actions/pictureEditor';
import {setDefaultValues} from 'store/actions/pictureData';
import {uploadPicture} from 'services/utils';


class FetchStatusMesseges extends Component {
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.isLoaded || nextProps.isLoading) {
      this.props.pictureEditorHide();
    }
  }

  onTryAgainBtnClick = () => {
    this.props.resetFetchStatus();
    this.props.pictureEditorShow();
  }

  onUploadAnotherFileBtnClick = () => {
    this.props.resetFetchStatus();
    this.props.pictureEditorHide();
    this.props.setDefaultValues();
    uploadPicture();
  }

  render() {
    const {isLoading, isLoaded} = this.props;

    return (
      <Fragment>
        <section className={`error ${isLoaded === false ? '' : 'visually-hidden'}`}>
          <div className="error__inner">
            <h2 className="error__title">
              Ошибка загрузки файла
            </h2>

            <div className="error__buttons">
              <button type="button" className="error__button" onClick={this.onTryAgainBtnClick}>
                Попробовать снова
              </button>

              <button type="button" className="error__button" onClick={this.onUploadAnotherFileBtnClick}>
                Загрузить другой файл
              </button>
            </div>
          </div>
        </section>

        <section className={`success ${isLoaded === true ? '' : 'visually-hidden'}`}>
          <div className="success__inner">
            <h2 className="success__title">
              Изображение успешно загружено
            </h2>

            <button type="button" className="success__button" onClick={this.props.resetFetchStatus}>
              Круто!
            </button>
          </div>
        </section>

        <div className={`loading ${isLoading ? '' : 'visually-hidden'}`}>
          <div className='loading__inner'>
            Загружаем...
          </div>
        </div>
      </Fragment>
    );
  }
};

function mapStateToProps(state) {
  return {
    isLoading: state.pictureFetch.isLoading,
    isLoaded: state.pictureFetch.isLoaded
  }
}

function mapDispatchToProps(dispatch) {
  return {
    resetFetchStatus: () => dispatch(resetFetchStatus()),
    pictureEditorHide: () => dispatch(pictureEditorHide()),
    pictureEditorShow: () => dispatch(pictureEditorShow()),
    setDefaultValues: () => dispatch(setDefaultValues())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchStatusMesseges);
