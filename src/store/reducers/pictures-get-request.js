import * as types from 'store/action-types';


const initialState = {
  data: [],
  isLoading: false,
  isLoaded: false,
  error: null,
};

export default function picturesGetRequestReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_PICTURES_START:
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_PICTURES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        data: action.payload,
      };
    case types.GET_PICTURES_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
      };
    default:
      return state;
  }
};
