/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import { editEncomendasRequest } from '~/store/modules/encomendas/actions';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Select } from './styles';

export default function Delivery({ match }) {
  const [recipientSelect, setRecipientSelect] = useState([]);
  const [deliveryManSelect, setDeliveryManSelect] = useState([]);
  const [product, setProduct] = useState([]);
  const { id } = match.params;

  const loadRecipient = async (inputValue, callback) => {
    const response = await api.get('recipients');

    const data = response.data.map(d => ({ value: d.id, label: d.name }));
    const filter = data.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filter);
  };

  useEffect(() => {
    async function getSelectData() {
      const response = await api.get(`deliveries/${id}`);

      if (response.data.recipient) {
        const recipientData = {
          value: response.data.recipient.id,
          label: response.data.recipient.name,
        };
        setRecipientSelect(recipientData);
      }

      if (response.data.deliveryman) {
        const deliveryManData = {
          value: response.data.deliveryman.id,
          label: response.data.deliveryman.name,
        };
        setDeliveryManSelect(deliveryManData);
      }
      setProduct(response.data);
    }

    getSelectData();
  }, [id]);

  const loadDeliveyMan = async (inputValue, callback) => {
    const response = await api.get('deliveryman');

    const data = response.data.map(d => ({ value: d.id, label: d.name }));
    const filter = data.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filter);
  };

  function changePage() {
    history.push('/encomendas');
  }

  const dispatch = useDispatch();
  async function handleSubmit(data) {
    const payload = { data, recipientSelect, deliveryManSelect, id };
    dispatch(editEncomendasRequest(payload));
    setTimeout(changePage, 3000);
  }
  console.tron.log(recipientSelect);
  return (
    <Container>
      <Form onSubmit={handleSubmit} initialData={product}>
        <header>
          <div>
            <strong>Edição de encomendas</strong>
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
            <div className="deliveryman">
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

Delivery.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }).isRequired,
  }).isRequired,
};
