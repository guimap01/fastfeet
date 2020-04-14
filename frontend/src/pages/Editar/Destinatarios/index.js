/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import api from '~/services/api';
import history from '~/services/history';
import { editDestinatariosRequest } from '~/store/modules/destinatarios/actions';
import { Container } from './styles';

export default function Recipient({ match }) {
  const [recipient, setRecipient] = useState([]);
  const { id } = match.params;

  useEffect(() => {
    async function loadRecipient() {
      const response = await api.get(`recipients/${id}`);
      setRecipient(response.data);
    }
    loadRecipient();
  }, [id]);

  function changePage() {
    history.push('/destinatarios');
  }
  const dispatch = useDispatch();
  function handleSubmit(data) {
    data.id = id;
    dispatch(editDestinatariosRequest(data));
    setTimeout(changePage, 3000);
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit} initialData={recipient[0]}>
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
              <Input name="street" placeholder={recipient.street} />
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
