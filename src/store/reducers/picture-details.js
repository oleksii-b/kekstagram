import * as types from 'store/action-types';


const initialState = {
  activePicture: null,
};

export default function pictureDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_ACTIVE_PICTURE:
      return {
        ...state,
        activePicture: action.payload,
      };
    default:
      return state;
  }
};
