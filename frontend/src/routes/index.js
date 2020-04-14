import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import Entregadores from '../pages/Entregadores';
import CadastroEntregadores from '../pages/Cadastros/Entregadores';
import EditarEntregadores from '../pages/Editar/Entregadores';

import Encomendas from '../pages/Encomendas';
import CadastroEncomendas from '../pages/Cadastros/Encomendas';
import EditarEncomendas from '../pages/Editar/Encomendas';

import Destinatarios from '../pages/Destinatarios';
import EditarDestinatarios from '../pages/Editar/Destinatarios';
import CadastroDestinatarios from '../pages/Cadastros/Destinatarios';

import Problemas from '../pages/Problemas';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/encomendas" component={Encomendas} isPrivate />
      <Route path="/encomendas/:id" component={Encomendas} isPrivate />
      <Route
        path="/cadastroencomendas"
        component={CadastroEncomendas}
        isPrivate
      />
      <Route
        path="/editarencomenda/:id"
        component={EditarEncomendas}
        isPrivate
      />

      <Route path="/entregadores" component={Entregadores} isPrivate />

      <Route
        path="/cadastroentregadores"
        component={CadastroEntregadores}
        isPrivate
      />
      <Route
        path="/editarentregador/:id"
        component={EditarEntregadores}
        isPrivate
      />

      <Route path="/destinatarios" component={Destinatarios} isPrivate />
      <Route
        path="/editardestinatarios/:id"
        component={EditarDestinatarios}
        isPrivate
      />
      <Route
        path="/cadastrodestinatario"
        component={CadastroDestinatarios}
        isPrivate
      />

      <Route path="/problemas" component={Problemas} isPrivate />
    </Switch>
  );
}
