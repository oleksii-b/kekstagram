import {
  SET_PICTURE_EFFECT,
  SET_PICTURE_EFFECT_LEVEL,
  SET_PICTURE_SCALE,
  SET_PICTURE_HASHTAGS,
  SET_PICTURE_COMMENT,
  SET_DEFAULT_VALUES
} from 'store/actions/actionTypes';


const initialState = {
  url: null,
  effect: 'none',
  effectLevel: 20,
  scale: 100,
  hashtags: '',
  description: ''
};

export default function pictureDataReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PICTURE_EFFECT:
      return {
        ...state,
        effect: action.payload
      }
    case SET_PICTURE_EFFECT_LEVEL:
      return {
        ...state,
        effectLevel: action.payload
      }
    case SET_PICTURE_SCALE:
      return {
        ...state,
        scale: action.payload
      }
    case SET_PICTURE_HASHTAGS:
      return {
        ...state,
        hashtags: action.payload
      }
    case SET_PICTURE_COMMENT:
      return {
        ...state,
        description: action.payload
      }
    case SET_DEFAULT_VALUES:
      return {
        ...initialState
      }
    default:
      return state
  }
}
