import React, { useEffect, useState } from 'react';
import {
  MdAdd,
  MdSearch,
  MdRemoveRedEye,
  MdDeleteForever,
  MdModeEdit,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import api from '~/services/api';

import { Container, Table, Modal } from './styles';
import StatusColor from '~/components/StatusColor';
import noImage from '~/assets/no-image.png';

export default function Encomendas() {
  const [delivery, setDelivery] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [deliveryModal, setDeliveryModal] = useState([]);
  const [recipientModal, setRecipientModal] = useState([]);
  const [signatureModal, setSignatureModal] = useState([]);
  const [product, setProduct] = useState('');

  useEffect(() => {
    async function loadDelivery() {
      const response = await api.get('deliveries', {
        params: { product },
      });

      setDelivery(response.data);
    }
    loadDelivery();
  }, [product]);

  function openModal(bool) {
    setIsOpen(bool);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function handleShow(id) {
    const response = await api.get(`deliveries/${id}`);

    const data = {
      ...response.data,
      formatedStartDate: response.data.start_date
        ? format(parseISO(response.data.start_date), 'dd/MM/yyyy', { ptBR })
        : null,
      formatedEndDate: response.data.end_date
        ? format(parseISO(response.data.end_date), 'dd/MM/yyyy', {
            ptBR,
          })
        : null,
    };

    setDeliveryModal(data);
    setRecipientModal(data.recipient);
    setSignatureModal(data.signature);
    openModal(true);
  }

  async function handleDelete(id) {
    const removeConfirm = window.confirm(
      'Tem certeza que deseja remover a encomenda?'
    );

    if (removeConfirm) {
      await api.delete(`/deliveries/${id}`);

      document.location.reload(true);
    }
  }

  function initialName(fullName) {
    fullName = fullName.replace(/\s(de|da|dos|das)\s/g, ' ');
    const initials = fullName.match(/\b(\w)/gi);
    const lastNames = initials
      .splice(1, initials.length - 1)
      .join('')
      .toLowerCase();
    return initials + lastNames;
  }

  function handleStatus(data) {
    if (data.canceled_at) {
      return 'CANCELADA';
    }
    if (data.end_date) {
      return 'ENTREGUE';
    }
    if (data.start_date) {
      return 'RETIRADA';
    }
    return 'PENDENTE';
  }
  return (
    <Container>
      <header>
        <div>
          <strong>Gerenciando encomendas</strong>
        </div>
        <div className="button-input">
          <div className="input">
            <MdSearch id="mdSearch" size={20} />
            <input
              type="text"
              placeholder="Buscar por encomenda"
              onChange={e => setProduct(e.target.value)}
            />
          </div>
          <Link to="/cadastroencomendas">
            <button type="button">
              <MdAdd id="mdAdd" size={24} />
              CADASTRAR
            </button>
          </Link>
        </div>
      </header>
      <Table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Produto</td>
            <td>Destinatário</td>
            <td>Entregador</td>
            <td>Cidade</td>
            <td>Estado</td>
            <td>Status</td>
            <td className="acoes">Ações</td>
          </tr>
        </thead>
        {delivery.length ? (
          delivery.map(data => (
            <tbody key={data.id}>
              <tr>
                <td>{`#${data.id}`}</td>
                <td>{data.product}</td>
                <td>
                  {data.recipient ? (
                    data.recipient.name
                  ) : (
                    <text>Destinatario não existe</text>
                  )}
                </td>
                <td>
                  <div className="name">
                    <div className="initial">
                      {initialName(data.deliveryman.name)}
                    </div>
                    {data.deliveryman ? (
                      data.deliveryman.name
                    ) : (
                      <text>Entregador não existe</text>
                    )}
                  </div>
                </td>
                <td>
                  {data.recipient ? (
                    data.recipient.city
                  ) : (
                    <text>Destinatario não existe</text>
                  )}
                </td>
                <td>
                  {data.recipient ? (
                    data.recipient.state
                  ) : (
                    <text>Destinatario não existe</text>
                  )}
                </td>
                <td>
                  <StatusColor status={handleStatus(data)} />
                </td>
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
                        <button type="button">
                          <Link to={`/editarencomenda/${data.id}`}>
                            <MdModeEdit size={20} color="#4D85EE" />{' '}
                            <text>Editar</text>
                          </Link>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(data.id)}
                        >
                          <MdDeleteForever size={20} color="#DE3B3B" />{' '}
                          <text>Excluir</text>
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
        <span>Informações da encomenda</span>
        <div className="information">
          <text>{`${recipientModal.street}, ${recipientModal.number}`}</text>
          <text>{`${recipientModal.city} - ${recipientModal.state}`}</text>
          <text>{recipientModal.cep}</text>
        </div>
        <br />
        <span>Datas</span>
        <div className="dates">
          <div>
            <strong>Retirada:</strong>
            <text>{deliveryModal.formatedStartDate}</text>
          </div>
          <div>
            <strong>Entrega:</strong>
            <text>{deliveryModal.formatedEndDate}</text>
          </div>
        </div>
        <br />
        <span>Assinatura do Destinatario</span>
        <img src={signatureModal ? signatureModal.url : noImage} alt="" />
      </Modal>
    </Container>
  );
}
