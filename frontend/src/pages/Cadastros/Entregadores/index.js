import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { FiCheck, FiChevronLeft } from 'react-icons/fi';
import { Container, Content } from './styles';
import AvatarInput from './AvatarInput';
import { signUpEntregadoresRequest } from '~/store/modules/entregadores/actions';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatorio'),
  name: Yup.string().required('Nome é obrigatorio'),
  avatar_id: Yup.number().required('A foto é obrigatoria'),
});

export default function Encomendas() {
  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(signUpEntregadoresRequest(data));
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Content>
          <h1>Cadastro de Entregadores</h1>
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
            <Input name="name" placeholder="Nome Completo" />
            <strong>Email</strong>
            <Input
              name="email"
              type="email"
              placeholder="Seu endereço de e-mail"
            />
          </div>
        </ul>
      </Form>
    </Container>
  );
}
