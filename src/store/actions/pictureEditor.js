import {
  PICTURE_EDITOR_HIDE,
  PICTURE_EDITOR_SHOW,
  PICTURE_EDITOR_FIELD_VALIDATE
} from './actionTypes';


export function pictureEditorHide() {
  return {
    type: PICTURE_EDITOR_HIDE
  }
}

export function pictureEditorShow() {
  return {
    type: PICTURE_EDITOR_SHOW
  }
}

export function pictureEditorFieldValidate(values) {
  let formFieldValidity = {
    hashtags: true
  };

  if (values.hashtags.length) {
    const hashtags = values.hashtags.split(' ');

    for (let hashtag of hashtags) {
      if (hashtag.trim().length && !hashtag.trim().match(/^#[^#]+$/)) {
        formFieldValidity = {
          ...formFieldValidity,
          hashtags: false
        };
      }
    }
  }

  return {
    type: PICTURE_EDITOR_FIELD_VALIDATE,
    payload: formFieldValidity
  }
}
