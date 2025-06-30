import { all, call, put, select, takeLeading } from 'redux-saga/effects';
import * as actions from './actions';
import { Product } from './types';
import Api, { HttpResponse } from 'app/services/api';

function* fetch(event: ReturnType<typeof actions.request.fetch>): any {
  const { resolve, reject } = event;

  try {
    yield put(actions.reduce.events('fetch', true));

    type Response = HttpResponse & { data: Array<Product> };

    const response: Response  = yield call(Api.get, 'products');

    if(response.status === 200) {
      yield put(actions.reduce.data({ data: response.data }));
      if (resolve) yield call(resolve, response.data);
    }
  } catch ({ message }: any) {
    if (reject) yield call(reject, { message });
  } finally {
    yield put(actions.reduce.events('fetch', false));
  }
}

function* details(event: ReturnType<typeof actions.request.details>):any {
  const { resolve, reject, payload: { id } } = event;

  try {
    yield put(actions.reduce.events('details', true, { ids: [id] }));

  } catch ({ message }: any) {
    if (reject) yield call(reject, { message });
  } finally {
    yield put(actions.reduce.events('details', false, { ids: [id] }));
  }
}

function* create(event: ReturnType<typeof actions.request.create>):any {
  const { resolve, reject, payload: { product } } = event;

  try {
    yield put(actions.reduce.events('create', true, { ids: [product.id] }));

  } catch ({ message }: any) {
    if (reject) yield call(reject, { message });
  } finally {
    yield put(actions.reduce.events('create', false, { ids: [product.id] }));
  }
}

export default function* () {
  yield all([
    takeLeading(actions.request.fetch, fetch),
    takeLeading(actions.request.details, details),
    takeLeading(actions.request.create, create),
  ]);
}