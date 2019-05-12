import {takeEvery} from 'redux-saga/effects';

import {GET_PICTURES, POST_PICTURE} from 'store/actionTypes';
import getPicturesAsync from './getPictures';
import postPictureAsync from './postPicture';


export default function* watchSagas() {
  yield takeEvery(GET_PICTURES, getPicturesAsync);
  yield takeEvery(POST_PICTURE, postPictureAsync);
}
