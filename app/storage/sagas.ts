import { all, fork } from 'redux-saga/effects';

function* sagas() {
  yield all([
    fork(require('app/modules/products').saga),
  ]);
}

export default sagas;
