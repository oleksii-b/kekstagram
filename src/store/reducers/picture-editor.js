import * as types from 'store/action-types';

const initialState = {
  isHidden: true,
  isUploading: false,
};

export default function pictureEditorReducer(state = initialState, action) {
  switch (action.type) {
    case types.PICTURE_EDITOR_HIDE:
      return {
        ...state,
        isHidden: true,
      }
    case types.PICTURE_EDITOR_SHOW:
      return {
        ...state,
        isHidden: false,
      }
    case types.UPLOADING_STATUS:
      return {
        ...state,
        isUploading: action.payload,
      }
    default:
      return state;
  }
}
