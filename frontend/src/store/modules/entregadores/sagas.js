import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import {
  signUpEntregadoresSuccess,
  signUpEntregadoresFailure,
  editEntregadoresSuccess,
  editEntregadoresFailure,
} from './actions';

export function* signUpEntregador({ payload }) {
  try {
    const { name, email, avatar_id } = payload.data;

    const profile = { name, email, avatar_id };

    yield call(api.post, 'deliveryman', profile);

    toast.success('Entregador cadastrado com sucesso!');

    yield put(signUpEntregadoresSuccess());
  } catch (err) {
    toast.error('Erro ao cadastrar o entregador!');
    yield put(signUpEntregadoresFailure());
  }
}

export function* editEntregador({ payload }) {
  try {
    const { name, avatar_id, email, id } = payload.data;
    const profile = { name, avatar_id, email };

    yield call(api.put, `deliveryman/${id}`, profile);
    toast.success('Entregador atualizado com sucesso!');

    yield put(editEntregadoresSuccess());
  } catch (err) {
    toast.error('Erro ao editar entregador!');
    yield put(editEntregadoresFailure());
  }
}

export default all([
  takeLatest('@deliveryman/SIGN_UP_REQUEST', signUpEntregador),
  takeLatest('@deliveryman/EDIT_REQUEST', editEntregador),
]);
