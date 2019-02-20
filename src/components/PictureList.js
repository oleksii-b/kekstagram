import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchPictures} from 'store/actions/pictureFetch';
import {pictureEditorHide, pictureEditorShow} from 'store/actions/pictureEditor';
import {setDefaultValues} from 'store/actions/pictureData';
import PictureUploader from './PictureUploader';
import PictureEditor from './PictureEditor';
import PictureMini from './PictureMini';


class PictureList extends Component {
  state = {
    pictures: []
  }

  componentDidMount = () => {
    this.props.fetchPictures();
  }

  componentWillReceiveProps = (nextProps) => {
    if (typeof nextProps.isLoaded === 'boolean') {
      if (nextProps.isLoaded) {
        this.props.setDefaultValues();
      }

      this.props.pictureEditorHide();
    }

    this.setState({
      pictures: nextProps.pictures
    });
  }

  onUploaderValueChange = (evt) => {
    const input = evt.target;

    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = (evt) => {
        this.props.pictureEditorShow();
        this.setState({
          picture: evt.target.result
        });
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  render() {
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

            <PictureEditor
              picture={this.state.picture}
            >
              <PictureUploader
                onInputChange={this.onUploaderValueChange}
              />
            </PictureEditor>
          </div>
        </section>

        {
          !!this.state.pictures.length
          &&
            this.state.pictures.map((picture) => {
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
  }
};

function mapStateToProps(state) {
  return {
    pictures: state.pictureFetch.all,
    isLoading: state.pictureFetch.isLoading,
    isLoaded: state.pictureFetch.isLoaded,
    hashtags: state.pictureData.hashtags
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPictures: () => dispatch(fetchPictures()),
    pictureEditorHide: () => dispatch(pictureEditorHide()),
    pictureEditorShow: () => dispatch(pictureEditorShow()),
    setDefaultValues: () => dispatch(setDefaultValues())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PictureList);
