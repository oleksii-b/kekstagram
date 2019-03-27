import {call, put, takeEvery} from 'redux-saga/effects';

import {POST_PICTURE} from 'store/actions/actionTypes';
import {postPictureStart, postPictureSuccess, postPictureError} from 'store/actions/pictureFetch';


function* postPictureAsync(action) {
  try {
    const payload = action.payload;

    postPictureStart();

    const response = yield call(
      fetch,
      'https://js.dump.academy/kekstagram',
      {
        method: 'POST',
        body: payload
      }
    );

    const data =  yield call([response, 'json']);

    if (data instanceof Array) {
      yield put(postPictureError());
    } else {
      yield put(postPictureSuccess());
    }
  } catch (error) {
    yield put(postPictureError());
  }
}

export default function* watchPostPicture() {
  yield takeEvery(POST_PICTURE, postPictureAsync);
}
