import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import {
  editDestinatariosSuccess,
  editDestinatariosFailure,
  signUpDestinatariosSuccess,
  signUpDestinatariosFailure,
} from './actions';

export function* editDestinatario({ payload }) {
  try {
    yield call(api.put, `recipients/${payload.data.id}`, payload.data);
    toast.success('Destinatário atualizado!');
    yield put(editDestinatariosSuccess());
  } catch (err) {
    toast.error('Falha ao editar destinatário!');
    yield put(editDestinatariosFailure());
  }
}

export function* signUpDestinatario({ payload }) {
  try {
    yield call(api.post, 'recipients', payload.data);
    toast.success('Destinatário Cadastrado!');
    yield put(signUpDestinatariosSuccess());
  } catch (err) {
    toast.error('Falha ao cadastrar destinatário!');
    yield put(signUpDestinatariosFailure());
  }
}

export default all([
  takeLatest('@destinatario/EDIT_REQUEST', editDestinatario),
  takeLatest('@destinatario/SIGN_UP_REQUEST', signUpDestinatario),
]);
