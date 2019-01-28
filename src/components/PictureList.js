import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchPictures, postPicture} from 'store/actions/pictureFetch';
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

  onUploadFormSubit = (evt) => {
    evt.preventDefault();
    this.props.postPicture(new FormData(evt.target));
  }

  render() {
    return (
      <section className="pictures container">
        <h2 className="pictures__title visually-hidden">Фотографии других пользователей</h2>

        {/* Поле для загрузки нового изображения на сайт */}
        <section className="img-upload">
          <div className="img-upload__wrapper">
            <h2 className="img-upload__title visually-hidden">
              Загрузка фотографии
            </h2>

            <form action="https://js.dump.academy/kekstagram" className="img-upload__form" id="upload-select-image" method="post" encType="multipart/form-data" autoComplete="off" onSubmit={this.onUploadFormSubit}>
              <PictureUploader
                onInputChange={this.onUploaderValueChange}
              />

              <PictureEditor
                picture={this.state.picture}
              />
            </form>
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
    postPicture: (data) => dispatch(postPicture(data)),
    pictureEditorHide: () => dispatch(pictureEditorHide()),
    pictureEditorShow: () => dispatch(pictureEditorShow()),
    setDefaultValues: () => dispatch(setDefaultValues())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PictureList);
