/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { MdSearch, MdDeleteForever, MdRemoveRedEye } from 'react-icons/md';
import { Dropdown } from 'react-bootstrap';

import api from '~/services/api';

import { Container, Table, Modal } from './styles';

export default function Encomendas() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [problemModal, setProblemModal] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const [deliveryID, setDeliveryId] = useState([]);

  useEffect(() => {
    async function loadDelivery() {
      const response = await api.get('problems', {
        params: { deliveryID },
      });

      setDelivery(response.data);
    }
    loadDelivery();
  }, [deliveryID]);

  function openModal(bool) {
    setIsOpen(bool);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function handleShow(id) {
    const response = await api.get(`problems/${id}`);
    const { description } = response.data[0];
    setProblemModal(description);

    openModal(true);
  }

  async function handleCancel(id) {
    const removeConfirm = window.confirm(
      'Tem certeza que deseja remover a encomenda?'
    );

    if (removeConfirm) {
      await api.put(`/canceldelivery/${id}`);

      document.location.reload(true);
    }
  }

  return (
    <Container>
      <header>
        <div>
          <strong>Problemas na entrega</strong>
        </div>
        <div className="button-input">
          <div className="input">
            <MdSearch id="mdSearch" size={20} />
            <input
              type="text"
              placeholder="Buscar por encomenda"
              onChange={e => setDeliveryId(e.target.value)}
            />
          </div>
        </div>
      </header>
      <Table>
        <thead>
          <tr>
            <td>Pedido</td>
            <td className="problema">Problema</td>
            <td className="acoes">Ações</td>
          </tr>
        </thead>
        {delivery.length ? (
          delivery.map(data => (
            <tbody key={data.delivery_id}>
              <tr>
                <td>{`#${data.delivery_id}`}</td>
                <td>{data.description}</td>
                <td className="dropdownlist">
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      <text className="dots">...</text>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <button
                          type="button"
                          onClick={() => handleShow(data.id)}
                        >
                          <MdRemoveRedEye size={20} color="#8E5BE8" />
                          <text>Visualizar</text>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCancel(data.delivery_id)}
                        >
                          <MdDeleteForever size={15} color="#DE3B3B" />
                          <text>Cancelar encomenda</text>
                        </button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            </tbody>
          ))
        ) : (
          <tbody>
            <tr>
              <td>Nenhum resultado encontrado</td>
            </tr>
          </tbody>
        )}
      </Table>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <span>VISUALIZAR PROBLEMA</span>
        <div className="information">
          <text>{problemModal}</text>
        </div>
      </Modal>
    </Container>
  );
}
