import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import {
  signUpEncomendasSuccess,
  signUpEncomendasFailure,
  editEncomendasSuccess,
  editEncomendasFailure,
} from './actions';

import api from '~/services/api';

export function* signUpEncomendas({ payload }) {
  try {
    const { product } = payload.data.data;
    const recipient_id = payload.data.recipientSelect.value;
    const deliveryman_id = payload.data.deliveryManSelect.value;

    const profile = { product, recipient_id, deliveryman_id };

    yield call(api.post, 'deliveries', profile);

    toast.success('Encomenda cadastrada com sucesso!');

    yield put(signUpEncomendasSuccess());
  } catch (err) {
    toast.error('Erro ao cadastrar a encomenda!');
    yield put(signUpEncomendasFailure());
  }
}

export function* editEncomendas({ payload }) {
  try {
    const { product } = payload.data.data;
    const recipient_id = payload.data.recipientSelect.value;
    const deliveryman_id = payload.data.deliveryManSelect.value;
    const { id } = payload.data;

    const profile = { product, recipient_id, deliveryman_id };

    yield call(api.put, `deliveries/${id}`, profile);
    toast.success('Encomenda atualizada com sucesso!');
    yield put(editEncomendasSuccess());
  } catch (err) {
    toast.error('Erro ao editar encomenda!');

    yield put(editEncomendasFailure());
  }
}

export default all([
  takeLatest('@delivery/SIGN_UP_REQUEST', signUpEncomendas),
  takeLatest('@delivery/EDIT_REQUEST', editEncomendas),
]);
