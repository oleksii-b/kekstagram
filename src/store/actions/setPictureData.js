import * as types from './actionTypes';


export function setDefaultValues() {
  document.getElementById('uploadFile').value = null;

  return {
    type: types.SET_DEFAULT_VALUES
  }
}

export function setPictureEffect(effectName) {
  return {
    type: types.SET_PICTURE_EFFECT,
    payload: effectName
  }
}

export function setPictureEffectLevel(effectLevel) {
  return {
    type: types.SET_PICTURE_EFFECT_LEVEL,
    payload: effectLevel
  }
}

export function setPictureScale(scale) {
  return {
    type: types.SET_PICTURE_SCALE,
    payload: scale
  }
}

export function setPictureHashtags(hashtags) {
  return {
    type: types.SET_PICTURE_HASHTAGS,
    payload: hashtags
  }
}

export function setPictureDescription(comment) {
  return {
    type: types.SET_PICTURE_COMMENT,
    payload: comment
  }
}
