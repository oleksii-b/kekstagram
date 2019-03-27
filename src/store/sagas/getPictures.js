import {call, put, takeEvery} from 'redux-saga/effects';

import {GET_PICTURES} from 'store/actions/actionTypes';
import {getPicturesStart, getPicturesSuccess, getPicturesError} from 'store/actions/getPictures';


function* getPicturesAsync(action) {
  try {
    getPicturesStart();

    const response = yield call(
      fetch,
      'https://raw.githubusercontent.com/oleksii-b/kekstagram/master/assets/data.json',
    );

    const data =  yield call([response, 'json']);

    yield put(getPicturesSuccess(data));
  } catch (error) {
    yield put(getPicturesError());
  }
}

export default function* watchGetPictures() {
  yield takeEvery(GET_PICTURES, getPicturesAsync);
}
