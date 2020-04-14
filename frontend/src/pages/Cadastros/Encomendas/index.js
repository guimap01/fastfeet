import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import { signUpEncomendasRequest } from '~/store/modules/encomendas/actions';

import api from '~/services/api';

import { Container, Select } from './styles';

export default function DeliveryForm() {
  const [recipientSelect, setRecipientSelect] = useState([]);
  const [deliveryManSelect, setDeliveryManSelect] = useState([]);

  const loadRecipient = async (inputValue, callback) => {
    const response = await api.get('recipients');

    const data = response.data.map(d => ({ value: d.id, label: d.name }));
    const filter = data.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filter);
  };

  const loadDeliveyMan = async (inputValue, callback) => {
    const response = await api.get('deliveryman');

    const data = response.data.map(d => ({ value: d.id, label: d.name }));
    const filter = data.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filter);
  };

  const dispatch = useDispatch();
  async function handleSubmit(data) {
    const payload = { data, recipientSelect, deliveryManSelect };
    dispatch(signUpEncomendasRequest(payload));
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <header>
          <div>
            <strong>Cadastro de encomendas</strong>
          </div>
          <div className="btn">
            <Link to="/encomendas">
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
            <div className="recipient">
              <span>Destinatário</span>
              <Select
                id="recipient"
                value={recipientSelect}
                loadOptions={loadRecipient}
                onChange={setRecipientSelect}
                placeholder="Buscar Destinatários"
              />
            </div>
            <div className="delivery-man">
              <span>Entregador</span>
              <Select
                id="deliveryman"
                value={deliveryManSelect}
                loadOptions={loadDeliveyMan}
                onChange={setDeliveryManSelect}
                placeholder="Buscar Entregadores"
              />
            </div>
          </div>
          <div className="product">
            <span>Nome do produto</span>
            <Input name="product" type="text" />
          </div>
        </div>
      </Form>
    </Container>
  );
}

DeliveryForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }).isRequired,
  }).isRequired,
};
