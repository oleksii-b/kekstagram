import * as types from 'store/actions/actionTypes';


const initialState = {
  all: [],
  isLoading: false,
  isLoaded: null,
  error: null,
  activePicture: {}
};

export default function pictureFetchReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_PICTURES:
      return {
        ...state,
        all: action.payload
      }
    case types.FETCH_PICTURE_START:
      return {
        ...state,
        isLoading: true
      }
    case types.FETCH_PICTURE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true
      }
    case types.FETCH_PICTURE_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoaded: false
      }
    case types.RESET_FETCH_STATUS:
      return {
        ...state,
        isLoaded: null
      }
    case types.SET_ACTIVE_PICTURE:
      return {
        ...state,
        activePicture: action.payload
      }
    default:
      return state
  }
}
