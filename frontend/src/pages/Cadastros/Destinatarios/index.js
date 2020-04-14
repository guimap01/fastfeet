/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';

import history from '~/services/history';
import { signUpDestinatariosRequest } from '~/store/modules/destinatarios/actions';
import { Container } from './styles';

export default function Recipient() {
  function changePage() {
    history.push('/destinatarios');
  }
  const dispatch = useDispatch();
  function handleSubmit(data) {
    dispatch(signUpDestinatariosRequest(data));
    setTimeout(changePage, 3000);
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <header>
          <div>
            <strong>Edição de destinatário</strong>
          </div>
          <div className="btn">
            <Link to="/destinatarios">
              <button className="back" type="button">
                <MdKeyboardArrowLeft id="mdBack" size={26} />
                VOLTAR
              </button>
            </Link>
            <button className="save" type="submit">
              <MdDone id="mdDone" size={26} />
              SALVAR
            </button>
          </div>
        </header>
        <div className="form">
          <div className="name">
            <span>Nome</span>
            <Input name="name" />
          </div>
          <div className="address1">
            <div className="street">
              <span>Rua</span>
              <Input name="street" />
            </div>
            <div className="number">
              <span>Numero</span>
              <Input name="number" />
            </div>
            <div className="complement">
              <span>Complemento</span>
              <Input name="complement" />
            </div>
          </div>
          <div className="address2">
            <div className="city">
              <span>Cidade</span>
              <Input name="city" />
            </div>
            <div className="state">
              <span>Estado</span>
              <Input name="state" />
            </div>
            <div className="cep">
              <span>CEP</span>
              <Input name="cep" />
            </div>
          </div>
        </div>
      </Form>
    </Container>
  );
}
