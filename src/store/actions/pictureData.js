import {
  SET_PICTURE_EFFECT,
  SET_PICTURE_EFFECT_LEVEL,
  SET_PICTURE_SCALE,
  SET_PICTURE_HASHTAGS,
  SET_PICTURE_COMMENT,
  SET_DEFAULT_VALUES
} from './actionTypes';


export function setPictureEffect(effectName) {
  return {
    type: SET_PICTURE_EFFECT,
    payload: effectName
  }
}

export function setPictureEffectLevel(effectLevel) {
  return {
    type: SET_PICTURE_EFFECT_LEVEL,
    payload: effectLevel
  }
}

export function setPictureScale(scale) {
  return {
    type: SET_PICTURE_SCALE,
    payload: scale
  }
}

export function setPictureHashtags(hashtags) {
  return {
    type: SET_PICTURE_HASHTAGS,
    payload: hashtags
  }
}

export function setPictureDescription(comment) {
  return {
    type: SET_PICTURE_COMMENT,
    payload: comment
  }
}

export function setDefaultValues() {
  document.getElementById('uploadFile').value = null;

  return {
    type: SET_DEFAULT_VALUES
  }
}
