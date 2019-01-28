import {createAction} from 'redux-actions';

import * as types from './actionTypes';


const fetchPicturesSuccess = createAction(types.FETCH_PICTURES);
const postPictureStart = createAction(types.FETCH_PICTURE_START);
const postPictureSuccess = createAction(types.FETCH_PICTURE_SUCCESS);
const postPictureError = createAction(types.FETCH_PICTURE_ERROR);

export function fetchPictures() {
  return async dispatch => {
    try {
      await fetch('https://raw.githubusercontent.com/oleksii-b/kekstagram/master/assets/data.json')
        .then((response) => response.json())
        .then((data) => {
          dispatch(fetchPicturesSuccess(data));
        });
    } catch (error) {
      console.error(error);
    }
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

export function resetFetchStatus() {
  return {
    type: types.RESET_FETCH_STATUS
  }
}

export function setActivePicture(data) {
  return {
    type: types.SET_ACTIVE_PICTURE,
    payload: data
  }
}
