/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { FiCheck, FiChevronLeft } from 'react-icons/fi';
import { Container, Content } from './styles';
import AvatarInput from '~/pages/Cadastros/Entregadores/AvatarInput';
import { editEntregadoresRequest } from '~/store/modules/entregadores/actions';
import api from '~/services/api';
import history from '~/services/history';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required(),
  name: Yup.string().required(),
  avatar_id: Yup.number(),
});

export default function Encomendas({ match }) {
  const [deliveryMan, setDeliveryMan] = useState([]);

  const { id } = match.params;

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadDeliveryMan() {
      const response = await api.get(`deliveryman/${id}`);

      setDeliveryMan(response.data);
    }

    loadDeliveryMan();
  }, [id]);

  function changePage() {
    history.push('/entregadores');
  }

  function handleSubmit(data) {
    data.id = id;
    dispatch(editEntregadoresRequest(data));
    setTimeout(changePage, 3000);
  }
  console.tron.log(deliveryMan);
  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit} initialData={deliveryMan}>
        <Content>
          <h1>Edição de entregadores</h1>
          <div>
            <Link to="/entregadores">
              <button type="button">
                <FiChevronLeft />
                <strong>VOLTAR</strong>
              </button>
            </Link>
            <content>
              <button type="submit">
                <FiCheck />
                <strong>SALVAR</strong>
              </button>
            </content>
          </div>
        </Content>
        <ul>
          <div>
            <AvatarInput name="avatar_id" />
            <strong>Nome</strong>
            <Input name="name" placeholder={deliveryMan.name} />
            <strong>Email</strong>
            <Input name="email" type="email" placeholder={deliveryMan.email} />
          </div>
        </ul>
      </Form>
    </Container>
  );
}
