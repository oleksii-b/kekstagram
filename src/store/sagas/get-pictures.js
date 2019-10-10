import {call, put} from 'redux-saga/effects';

import {
  getPicturesStart,
  getPicturesSuccess,
  getPicturesError,
} from 'store/actions';


export default function* getPicturesAsync(action) {
  try {
    getPicturesStart();

    const response = yield call(
      fetch,
      'https://raw.githubusercontent.com/oleksii-b/kekstagram/master/assets/data.json',
    );

    const data = yield call([response, 'json']);

    yield put(getPicturesSuccess(data));
  } catch (error) {
    yield put(getPicturesError());
  }
}
