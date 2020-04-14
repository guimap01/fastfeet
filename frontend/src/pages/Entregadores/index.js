import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { MdSearch, MdModeEdit, MdDeleteForever, MdAdd } from 'react-icons/md';

import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

import avatarImage from '~/assets/avatar-1577909_640.png';

import api from '~/services/api';

import { Container, Table } from './styles';

export default function Entregadores() {
  const [deliveryMan, setDeliveryMan] = useState([]);

  const [nameDeliveryMan, setNameDeliveryMan] = useState();

  useEffect(() => {
    async function loadDeliveryMan() {
      const response = await api.get('deliveryman', {
        params: { nameDeliveryMan },
      });

      setDeliveryMan(response.data);
    }

    loadDeliveryMan();
  }, [nameDeliveryMan]);

  function reloadPage() {
    document.location.reload(true);
  }

  async function handleDelete(id) {
    const removeConfirm = window.confirm('Deseja confirmar?');

    if (removeConfirm) {
      try {
        await api.delete('deliveryman', {
          params: { id },
        });
        toast.success('Entregador deletado');
        setTimeout(reloadPage, 3000);
      } catch (err) {
        toast.error('Erro ao deletar entregador');
      }
    }
  }

  return (
    <Container>
      <header>
        <div>
          <strong>Gerenciando entregadores</strong>
        </div>
        <div className="button-input">
          <div className="input">
            <MdSearch id="mdSearch" size={20} />
            <input
              type="text"
              placeholder="Buscar por entregador"
              onChange={e => setNameDeliveryMan(e.target.value)}
            />
          </div>

          <Link to="/cadastroentregadores">
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
            <td className="sizeTd">ID</td>
            <td className="sizeTd">Foto</td>
            <td className="sizeTd">Nome</td>
            <td className="sizeTd">Email</td>
            <td className="acoes">Ações</td>
          </tr>
        </thead>

        {deliveryMan.length ? (
          deliveryMan.map(data => (
            <tbody key={data.id}>
              <tr>
                <td>{`#${data.id}`}</td>
                <td>
                  <img
                    src={data.avatar ? data.avatar.url : avatarImage}
                    alt=""
                  />
                </td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td className="dropdownlist">
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      <text className="dots">...</text>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <button type="button">
                          <Link to={`/editarentregador/${data.id}`}>
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
    </Container>
  );
}
