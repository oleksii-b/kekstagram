import React, {PureComponent} from 'react';
import pictureUploader from './pictureUploader';


export default class PictureUploader extends PureComponent {
  render() {
    return pictureUploader({
      onInputChange: this.props.onInputChange
    });
  }
};
