import React, {PureComponent} from 'react';


export default class PictureUploader extends PureComponent {
  render() {
    return (
      <fieldset className="img-upload__start">
        <label className="img-upload__label  img-upload__control">
          <input id='uploadFile' type="file" className="img-upload__input visually-hidden" onInput={this.props.onInputChange} name="filename" required />
          Загрузить
        </label>
      </fieldset>
    );
  }
};
