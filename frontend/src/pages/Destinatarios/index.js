import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  MdSearch,
  MdChevronLeft,
  MdChevronRight,
  MdModeEdit,
  MdDeleteForever,
  MdAdd,
} from 'react-icons/md';

import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

import api from '~/services/api';

import { Container, Table } from './styles';

export default function Destinatarios() {
  const [recipient, setRecipient] = useState([0]);

  const [nameRecipient, setNameRecipient] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadDestinatario() {
      const response = await api.get('recipients', {
        params: { nameRecipient, page },
      });
      setRecipient(response.data);
    }

    loadDestinatario();
  }, [nameRecipient, page]);

  function handleNextPage() {
    if (recipient.length === 6) {
      setPage(page + 1);
    }
  }

  function handlePrevPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }
  function reloadPage() {
    document.location.reload(true);
  }

  async function handleDelete(id) {
    const removeConfirm = window.confirm('Deseja confirmar?');

    if (removeConfirm) {
      try {
        await api.delete(`recipients/${id}`);
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
          <strong>Gerenciando destinatários</strong>
        </div>
        <div className="button-input">
          <div className="input">
            <MdSearch id="mdSearch" size={20} />
            <input
              type="text"
              placeholder="Buscar por destinatario"
              onChange={e => setNameRecipient(e.target.value)}
            />
          </div>
          <button className="prev" type="button" onClick={handlePrevPage}>
            <MdChevronLeft size={36} color="#000" />
          </button>
          <button className="prev" type="button" onClick={handleNextPage}>
            <MdChevronRight size={36} color="#000" />
          </button>
          <Link to="/cadastrodestinatario">
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
            <td>Nome</td>
            <td>Endereço</td>
            <td className="acoes">Ações</td>
          </tr>
        </thead>

        {recipient.length ? (
          recipient.map(data => (
            <tbody key={data.id}>
              <tr>
                <td>{`#${data.id}`}</td>
                <td>{data.name}</td>
                <td>{`${data.street}, ${data.number}, ${data.city} - ${data.state}`}</td>
                <td className="dropdownlist">
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      <text className="dots">...</text>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <button type="button">
                          <Link to={`/editardestinatarios/${data.id}`}>
                            <MdModeEdit size={20} color="#4D85EE" />
                            <text>Editar</text>
                          </Link>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(data.id)}
                        >
                          <MdDeleteForever size={20} color="#DE3B3B" />
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
