import {createAction} from 'redux-actions';

import * as types from 'store/actionTypes';


export const postPicture = createAction(types.POST_PICTURE);
export const postPictureStart = createAction(types.FETCH_PICTURE_START);
export const postPictureSuccess = createAction(types.FETCH_PICTURE_SUCCESS);
export const postPictureError = createAction(types.FETCH_PICTURE_ERROR);
export const resetFetchStatus = createAction(types.RESET_FETCH_STATUS);
export const setActivePicture = createAction(types.SET_ACTIVE_PICTURE);
