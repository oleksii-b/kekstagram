import * as types from 'store/actionTypes';


const initialState = {
  isHidden: true
};

export default function pictureEditorReducer(state = initialState, action) {
  switch (action.type) {
    case types.PICTURE_EDITOR_HIDE:
      return {
        ...state,
        isHidden: true
      }
    case types.PICTURE_EDITOR_SHOW:
      return {
        ...state,
        isHidden: false
      }
    default:
      return state
  }
}
