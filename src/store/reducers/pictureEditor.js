import {
  PICTURE_EDITOR_HIDE,
  PICTURE_EDITOR_SHOW,
  PICTURE_EDITOR_FIELD_VALIDATE
} from 'store/actions/actionTypes';


const initialState = {
  isHidden: true,
  formFieldValidity: {
    hashtags: true
  }
};

export default function pictureEditorReducer(state = initialState, action) {
  switch (action.type) {
    case PICTURE_EDITOR_HIDE:
      return {
        ...state,
        isHidden: true
      }
    case PICTURE_EDITOR_SHOW:
      return {
        ...state,
        isHidden: false
      }
    case PICTURE_EDITOR_FIELD_VALIDATE:
      return {
        ...state,
        formFieldValidity: action.payload
      }
    default:
      return state
  }
}
