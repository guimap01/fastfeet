import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import entregadores from './entregadores/sagas';
import encomendas from './encomendas/sagas';
import destinatarios from './destinatarios/sagas';

export default function* rootSaga() {
  return yield all([auth, user, entregadores, encomendas, destinatarios]);
}
