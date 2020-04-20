import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {
  getPictures,
  pictureEditorHide,
  setDefaultValues,
  resetPostRequestStatus,
} from 'store/actions';
import {getPictuersSelector} from 'utils/selectors';
import PictureUploadForm from 'components/picture-upload-form';
import PictureMini from 'components/picture-mini';
import './index.scoped.less';

class PictureList extends React.PureComponent {
  state = {
    pictures: [],
    isPosting: false,
  }

  componentDidMount() {
    this.props.getPictures();
  }

  render() {
    const {pictures} = this.state;

    return (
      <section className="pictures container">
        <h2 className="pictures__title visually-hidden">
          Фотографии других пользователей
        </h2>

        <section className="img-upload">
          <div className="img-upload__wrapper">
            <h2 className="visually-hidden">
              Загрузка фотографии
            </h2>

            <PictureUploadForm />
          </div>
        </section>

        {!!pictures.length && (
          pictures.map((picture) => {
            return (
              <PictureMini
                key={picture.url}
                data={picture}
              />
            );
          })
        )}
      </section>
    );
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    let isPosting = false;

    if (typeof nextProps.isLoaded === 'boolean' && !prevState.isPosting) {
      if (nextProps.isLoaded) {
        nextProps.setDefaultValues();
      }

      nextProps.pictureEditorHide();

      isPosting = true;
    }

    const search = nextProps.location.search.slice(1);

    let pictures = nextProps.pictures;

    getPictuersSelector({
      pictures,
      sortBy: search,
    });

    if (search === 'new') {
      pictures = [...nextProps.loadedPictures];
    }

    return {
      pictures,
      isPosting,
    };
  }
}

function mapStateToProps(state) {
  const {isLoading, isLoaded} = state.picturePostRequest;
  const {data} = state.picturesGetRequest;

  return {
    isLoading,
    isLoaded,
    pictures: data,
    loadedPictures: [...data],
    hashtags: state.pictureFormData.hashtags,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getPictures,
    pictureEditorHide,
    setDefaultValues,
    resetPostRequestStatus,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PictureList);
