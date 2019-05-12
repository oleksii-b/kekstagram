import {createAction} from 'redux-actions';

import * as types from 'store/actionTypes';


export const pictureEditorHide = createAction(types.PICTURE_EDITOR_HIDE);
export const pictureEditorShow = createAction(types.PICTURE_EDITOR_SHOW);
