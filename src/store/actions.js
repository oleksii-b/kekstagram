import {createAction} from 'redux-actions';

import * as types from 'store/action-types';

export const getPictures = createAction(types.GET_PICTURES);
export const getPicturesStart = createAction(types.GET_PICTURES_START);
export const getPicturesSuccess = createAction(types.GET_PICTURES_SUCCESS);
export const getPicturesError = createAction(types.GET_PICTURES_ERROR);

export const pictureEditorHide = createAction(types.PICTURE_EDITOR_HIDE);
export const pictureEditorShow = createAction(types.PICTURE_EDITOR_SHOW);

export const setUploadingStatus = createAction(types.UPLOADING_STATUS);
export const setActivePicture = createAction(types.SET_ACTIVE_PICTURE);

export const postPicture = createAction(types.POST_PICTURE);
export const postPictureStart = createAction(types.POST_PICTURE_START);
export const postPictureSuccess = createAction(types.POST_PICTURE_SUCCESS);
export const postPictureError = createAction(types.POST_PICTURE_ERROR);
export const resetPostRequestStatus = createAction(types.RESET_POST_REQUEST_STATUS);

export const setDefaultValues = createAction(types.SET_DEFAULT_VALUES);
export const setPictureSrc = createAction(types.SET_PICTURE_SRC);
export const setPictureEffect = createAction(types.SET_PICTURE_EFFECT);
export const setPictureEffectLevel = createAction(types.SET_PICTURE_EFFECT_LEVEL);
export const setPictureScale = createAction(types.SET_PICTURE_SCALE);
export const setPictureHashtags = createAction(types.SET_PICTURE_HASHTAGS);
export const setPictureDescription = createAction(types.SET_PICTURE_COMMENT);
