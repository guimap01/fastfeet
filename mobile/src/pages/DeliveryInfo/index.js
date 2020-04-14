import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {} from 'react-redux';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { StatusBar, View, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Content,
  HeaderInformation,
  Title,
  DeliveryTitle,
  DeliveryData,
  HeaderStatus,
  DeliveryDates,
  DeliveryDate,
  DeliveryInformation,
  DeliveryStatus,
  MenuBottom,
  ActionButtom,
  ButtonTitle,
  ConfirmBox,
  ConfirmText,
} from './styles';

import api from '~/services/api';

export default function DeliveryDetails({ navigation }) {
  const id = navigation.getParam('deliveryId');

  const [delivery, setDelivery] = useState([]);
  const [loadRecipient, setLoadRecipient] = useState([]);

  useEffect(() => {
    async function loadDelivery() {
      const response = await api.get(`deliverymandelivery/${id}`);

      const { recipient } = response.data;

      const data = {
        ...response.data,
        formattedStartDate: response.data.start_date
          ? format(parseISO(response.data.start_date), 'dd / MM / yyyy', {
              ptBR,
            })
          : '- - / - - / - -',
        formattedEndDate: response.data.end_date
          ? format(parseISO(response.data.end_date), 'dd / MM / yyyy', {
              ptBR,
            })
          : '- - / - - / - -',
        completeAddress: `${recipient.street}, ${recipient.number} ${
          recipient.complement
            ? `- ${recipient.complement}, ${recipient.city}-${recipient.state}, ${recipient.cep}`
            : `, ${recipient.city}-${recipient.state}, ${recipient.cep}`
        }`,
      };

      setDelivery(data);
      setLoadRecipient(data.recipient);
    }

    loadDelivery();
  }, [id]);

  async function handlePickup() {
    try {
      console.tron.log(delivery.id);
      const response = await api.put(
        `pickup?idDeliveryMan=${delivery.deliveryman_id}&idDelivery=${delivery.id}`
      );

      if (response.status === 200) {
        ToastAndroid.show(
          'Encomenda retirada com sucesso.',
          ToastAndroid.SHORT
        );
      }
    } catch (err) {
      ToastAndroid.show(
        'Falha na Retirada. Fora do horario ou maximo de retiradas atingido. ',
        ToastAndroid.LONG
      );
    }
  }

  function handleStatus(data) {
    if (data.end_date) {
      return 'Entregue';
    }
    if (data.start_date) {
      return 'Retirada';
    }
    return 'Pendente';
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7d40e7" />
      <View style={{ backgroundColor: '#7d40e7', height: 100 }} />
      <Container>
        <Content>
          <DeliveryInformation>
            <HeaderInformation>
              <Icon name="local-shipping" size={20} color="#7D40E7" />
              <Title>Informações da Entrada</Title>
            </HeaderInformation>
            <DeliveryTitle>Destinatário</DeliveryTitle>
            <DeliveryData>{loadRecipient.name}</DeliveryData>
            <DeliveryTitle>Endereço de Entrega</DeliveryTitle>
            <DeliveryData>{delivery.completeAddress}</DeliveryData>
            <DeliveryTitle>Produto</DeliveryTitle>
            <DeliveryData>{delivery.product}</DeliveryData>
          </DeliveryInformation>
          <DeliveryStatus>
            <HeaderStatus>
              <Icon name="event" size={20} color="#7D40E7" />
              <Title>Situação da Entrega</Title>
            </HeaderStatus>
            <DeliveryTitle>Status</DeliveryTitle>
            <DeliveryData>{handleStatus(delivery)}</DeliveryData>
            <DeliveryDates>
              <DeliveryDate>
                <DeliveryTitle>Data de Retirada</DeliveryTitle>
                <DeliveryData>{delivery.formattedStartDate}</DeliveryData>
              </DeliveryDate>
              <DeliveryDate>
                <DeliveryTitle>Data de Entrega</DeliveryTitle>
                <DeliveryData>{delivery.formattedEndDate}</DeliveryData>
              </DeliveryDate>
            </DeliveryDates>
          </DeliveryStatus>
          {delivery.end_date === null ? (
            <MenuBottom>
              <ActionButtom
                onPress={() => {
                  navigation.navigate('DeliveryProblem', {
                    deliveryId: delivery.id,
                  });
                }}
              >
                <Icon name="highlight-off" size={24} color="#E74040" />
                <ButtonTitle>Informar Problema</ButtonTitle>
              </ActionButtom>
              <ActionButtom
                onPress={() => {
                  navigation.navigate('Problem', {
                    deliveryId: delivery.id,
                  });
                }}
              >
                <Icon name="info-outline" size={24} color="#E7BA40" />
                <ButtonTitle>Visualizar Problemas</ButtonTitle>
              </ActionButtom>
              <ActionButtom
                onPress={
                  delivery.start_date === null
                    ? () => handlePickup()
                    : () => {
                        navigation.navigate('Signature', {
                          deliveryId: delivery.id,
                        });
                      }
                }
              >
                {delivery.start_date === null ? (
                  <>
                    <Icon name="local-shipping" size={24} color="#7D40E7" />
                    <ButtonTitle>Retirar Encomenda</ButtonTitle>
                  </>
                ) : (
                  <>
                    <Icon name="alarm-on" size={24} color="#67e25e" />
                    <ButtonTitle>Confirmar Entrega</ButtonTitle>
                  </>
                )}
              </ActionButtom>
            </MenuBottom>
          ) : (
            <ConfirmBox>
              <ConfirmText>Entregue!!</ConfirmText>
            </ConfirmBox>
          )}
        </Content>
      </Container>
    </>
  );
}

DeliveryDetails.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
};
