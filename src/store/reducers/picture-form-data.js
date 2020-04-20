import * as types from 'store/action-types';

const initialState = {
  src: null,
  effect: 'none',
  effectLevel: 20,
  scale: 100,
  hashtags: '',
  description: '',
};

export default function pictureFormDataReducer(state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case types.SET_PICTURE_SRC:
      return {
        ...state,
        src: payload,
      };
    case types.SET_PICTURE_EFFECT:
      return {
        ...state,
        effect: payload,
      };
    case types.SET_PICTURE_EFFECT_LEVEL:
      return {
        ...state,
        effectLevel: payload,
      };
    case types.SET_PICTURE_SCALE:
      return {
        ...state,
        scale: payload,
      };
    case types.SET_PICTURE_HASHTAGS:
      return {
        ...state,
        hashtags: payload,
      };
    case types.SET_PICTURE_COMMENT:
      return {
        ...state,
        description: payload,
      };
    case types.SET_DEFAULT_VALUES:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
