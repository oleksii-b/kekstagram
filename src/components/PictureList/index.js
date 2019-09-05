import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {getPictures} from 'store/actions/getPictures';
import {pictureEditorHide} from 'store/actions/pictureEditor';
import {setDefaultValues} from 'store/actions/setPictureData';
import PictureUploadForm from 'components/PictureUploadForm';
import PictureMini from 'components/PictureMini';


class PictureList extends React.Component {
  state = {
    pictures: [],
  };

  static getDerivedStateFromProps = (nextProps) => {
    if (typeof nextProps.isLoaded === 'boolean') {
      if (nextProps.isLoaded) {
        nextProps.setDefaultValues();
      }

      nextProps.pictureEditorHide();
    }

    let pictures = [...nextProps.pictures];

    if (pictures.length) {
      const search = nextProps.location.search.slice(1);

      if (search === 'popular') {
        pictures = pictures.sort((prevItem, nextItem) =>
          nextItem.likes - prevItem.likes
        );
      }

      if (search === 'most-commented') {
        pictures = pictures.sort((prevItem, nextItem) =>
          nextItem.comments.length - prevItem.comments.length
        );
      }
    }

    return {
      pictures,
    };
  };

  componentDidMount = () => {
    this.props.getPictures();
  };

  render = () => {
    const {pictures} = this.state;

    return (
      <section className='pictures container'>
        <h2 className='pictures__title visually-hidden'>
          Фотографии других пользователей
        </h2>

        {/* Поле для загрузки нового изображения на сайт */}
        <section className='img-upload'>
          <div className='img-upload__wrapper'>
            <h2 className='img-upload__title visually-hidden'>
              Загрузка фотографии
            </h2>

            <PictureUploadForm />
          </div>
        </section>

        {
          !!pictures.length
          &&
            pictures.map((picture) => {
              return (
                <PictureMini
                  key={picture.url}
                  data={picture}
                />
              );
            })
        }
      </section>
    );
  };
};

function mapStateToProps(state) {
  const {data, isLoading, isLoaded} = state.pictureFetch;

  return {
    isLoading,
    isLoaded,
    pictures: data,
    hashtags: state.pictureData.hashtags,
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getPictures,
    pictureEditorHide,
    setDefaultValues,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PictureList);
