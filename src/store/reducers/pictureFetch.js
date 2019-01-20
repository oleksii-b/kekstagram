import {
    FETCH_PICTURES,
    FETCH_PICTURE_START,
    FETCH_PICTURE_SUCCESS,
    FETCH_PICTURE_ERROR,
    RESET_FETCH_STATUS,
    SET_ACTIVE_PICTURE
} from 'store/actions/actionTypes';


const initialState = {
  all: [],
  isLoading: false,
  isLoaded: null,
  error: null,
  activePicture: {}
};

export default function pictureFetchReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PICTURES:
      return {
        ...state,
        all: action.payload
      }
    case FETCH_PICTURE_START:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_PICTURE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true
      }
    case FETCH_PICTURE_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoaded: false
      }
    case RESET_FETCH_STATUS:
      return {
        ...state,
        isLoaded: null
      }
    case SET_ACTIVE_PICTURE:
      return {
        ...state,
        activePicture: action.payload
      }
    default:
      return state
  }
}
