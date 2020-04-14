import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { View } from 'react-native';

import { Container, Content, InputProblem, SubmitProblem } from './styles';

import api from '~/services/api';

export default function DeliveryProblem({ navigation }) {
  const id = navigation.getParam('deliveryId');
  const [problem, setProblem] = useState('');

  async function handleSubmit() {
    await api.post(`/problems/${id}`, {
      description: problem,
    });

    navigation.navigate('Dashboard');
  }

  return (
    <>
      <View style={{ backgroundColor: '#7d40e7', height: 100 }} />
      <Container>
        <Content>
          <InputProblem
            type="text"
            placeholder="Inclua aqui o problema que ocorreu na entrega."
            returnKeyType="send"
            value={problem}
            onChangeText={setProblem}
            onSubmitEditing={handleSubmit}
          />
          <SubmitProblem onPress={handleSubmit}>Enviar</SubmitProblem>
        </Content>
      </Container>
    </>
  );
}

DeliveryProblem.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
};
