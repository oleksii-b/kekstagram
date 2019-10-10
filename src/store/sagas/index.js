import {takeEvery} from 'redux-saga/effects';

import {GET_PICTURES, POST_PICTURE} from 'store/action-types';
import getPicturesAsync from './get-pictures';
import postPictureAsync from './post-picture';


export default function* watchSagas() {
  yield takeEvery(GET_PICTURES, getPicturesAsync);
  yield takeEvery(POST_PICTURE, postPictureAsync);
};
