/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { all, takeLatest } from 'redux-saga/effects';

import { ProcessTypes } from './process/types';
import { load } from './process/sagas';

export default function* rootSaga() {
  return yield all([takeLatest(ProcessTypes.GET_PROCESS, load)]);
}
