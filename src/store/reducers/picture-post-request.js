import * as types from 'store/action-types';


const initialState = {
  data: [],
  isLoading: false,
  isLoaded: null,
  error: null,
};

export default function picturePostRequestReducer(state = initialState, action) {
  switch (action.type) {
    case types.POST_PICTURE_START:
      return {
        ...state,
        isLoading: true,
      };
    case types.POST_PICTURE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
      };
    case types.POST_PICTURE_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
      };
    case types.RESET_POST_REQUEST_STATUS:
      return {
        ...state,
        isLoaded: null,
      };
    default:
      return state;
  }
};
