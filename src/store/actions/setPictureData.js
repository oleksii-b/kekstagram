import {createAction} from 'redux-actions';

import * as types from 'store/actionTypes';


export const setDefaultValues = createAction(types.SET_DEFAULT_VALUES);
export const setPictureSrc = createAction(types.SET_PICTURE_SRC);
export const setPictureEffect = createAction(types.SET_PICTURE_EFFECT);
export const setPictureEffectLevel = createAction(types.SET_PICTURE_EFFECT_LEVEL);
export const setPictureScale = createAction(types.SET_PICTURE_SCALE);
export const setPictureHashtags = createAction(types.SET_PICTURE_HASHTAGS);
export const setPictureDescription = createAction(types.SET_PICTURE_COMMENT);
