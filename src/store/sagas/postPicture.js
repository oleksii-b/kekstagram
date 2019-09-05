import {call, put} from 'redux-saga/effects';

import {
  postPictureStart,
  postPictureSuccess,
  postPictureError
} from 'store/actions/pictureFetch';


export default function* postPictureAsync(action) {
  try {
    postPictureStart();

    const response = yield call(
      fetch,
      'https://js.dump.academy/kekstagram',
      {
        method: 'POST',
        body: action.payload
      }
    );

    const data = yield call([response, 'json']);

    if (data instanceof Array) {
      yield put(postPictureError());
    } else {
      yield put(postPictureSuccess());
    }
  } catch (error) {
    yield put(postPictureError());
  }
};
