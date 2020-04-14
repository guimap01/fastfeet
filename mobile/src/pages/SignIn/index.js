import React, { useState } from 'react';

import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import logo from '~/assets/fastfeet-logo.png';

import Background from '~/components/Background';

import { Container, Form, FormInput, SubmitButton } from './styles';
import { entryRequest } from '~/store/modules/user/actions';

export default function SignIn() {
  const dispatch = useDispatch();

  const [id, setId] = useState('');

  const loading = useSelector((state) => state.user.loading);

  function handleSubmit() {
    dispatch(entryRequest(id));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} tintColor="white" />
        <Form>
          <FormInput
            placeholder="Insira seu ID de cadastro"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={id}
            onChangeText={setId}
          />
          <SubmitButton loading={loading} onPress={handleSubmit}>
            Entrar no sistema
          </SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}
