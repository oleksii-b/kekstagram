import {createAction} from 'redux-actions';

import * as types from 'store/actionTypes';


export const getPictures = createAction(types.GET_PICTURES);
export const getPicturesStart = createAction(types.GET_PICTURES_START);
export const getPicturesSuccess = createAction(types.GET_PICTURES_SUCCESS);
export const getPicturesError = createAction(types.GET_PICTURES_ERROR);
