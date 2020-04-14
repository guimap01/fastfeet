import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { entrySuccess, entryFailure } from './actions';

export function* entry({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.get, `deliverymanfunction/${id}`);
    const { name, email, created_at } = response.data;
    const { url } = response.data.avatar;
    yield put(entrySuccess(id, name, email, url, created_at));
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique seus dados ou sua conexão'
    );
    yield put(entryFailure());
  }
}

export function exit() {}

export default all([
  takeLatest('@entry/ENTRY_REQUEST', entry),
  takeLatest('@exit/EXIT_REQUEST', exit),
]);
