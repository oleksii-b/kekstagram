import {
  FETCH_PICTURES,
  FETCH_PICTURE_START,
  FETCH_PICTURE_SUCCESS,
  FETCH_PICTURE_ERROR,
  RESET_FETCH_STATUS,
  SET_ACTIVE_PICTURE
} from './actionTypes';


export function getPictures() {
  return async dispatch => {
    try {
      await fetch('https://raw.githubusercontent.com/oleksii-b/kekstagram/master/assets/data.json')
        .then((response) => response.json())
        .then((data) => {
          dispatch(fetchPictures(data));
        });
    } catch (error) {
      console.error(error);
    }
  }
}

export function fetchPictures(data) {
  return {
    type: FETCH_PICTURES,
    payload: data
  }
}

export function postPicture(data) {
  return async dispatch => {
    dispatch(postPictureStart());

    try {
      const response = await fetch('https://js.dump.academy/kekstagram', {
        method: 'POST',
        body: data
      });

      response.json().then((data) => {
        if (data instanceof Array) {
          dispatch(postPictureError());
        } else {
          dispatch(postPictureSuccess());
        }
      });
    } catch (error) {
      dispatch(postPictureError());
    }
  }
}

export function postPictureStart() {
  return {
    type: FETCH_PICTURE_START
  }
}

export function postPictureSuccess() {
  return {
    type: FETCH_PICTURE_SUCCESS
  }
}

export function postPictureError() {
  return {
    type: FETCH_PICTURE_ERROR
  }
}

export function resetFetchStatus() {
  return {
    type: RESET_FETCH_STATUS
  }
}

export function setActivePicture(data) {
  return {
    type: SET_ACTIVE_PICTURE,
    payload: data
  }
}
