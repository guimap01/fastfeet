/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Label, Strong, Image, ExitButton } from './styles';

import { exitRequest } from '~/store/modules/user/actions';

export default function Profile() {
  const deliveryMan = useSelector((state) => state.user);

  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(exitRequest());
  }

  return (
    <Container>
      <Image
        source={{
          uri:
            deliveryMan.url ||
            `https://ui-avatars.com/api/?size=140&background=f4effc&color=a28fd0&name=${deliveryMan.name}`,
        }}
      />
      <Label>Nome Completo</Label>
      <Strong>{deliveryMan.name}</Strong>
      <Label>Email</Label>
      <Strong>{deliveryMan.email}</Strong>
      <Label>Data de cadastro</Label>
      <Strong>{deliveryMan.created_at}</Strong>
      <ExitButton
        onPress={() => {
          handleLogout();
        }}
      >
        Logout
      </ExitButton>
    </Container>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu Perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="account-circle" size={20} color={tintColor} />
  ),
};
