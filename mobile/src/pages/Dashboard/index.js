/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { StatusBar, TouchableOpacity, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseISO, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import api from '~/services/api';
import ProgressBar from '~/components/ProgressBar';

import { exitRequest } from '~/store/modules/user/actions';

import {
  Container,
  Header,
  Image,
  InfoDeliveryMan,
  Text,
  DeliveryManName,
  ExitIcon,
  Delivery,
  DeliveryHeader,
  Title,
  Pendente,
  Entregue,
  Status,
  StatusHeader,
  TitleStatus,
  Details,
  RegisterTitle,
  Date,
  City,
  ButtonDetails,
  DetailsText,
} from './styles';

export default function Dashboard({ navigation }) {
  const [activity, setActivity] = useState(1);
  const [status, setStatus] = useState('');
  const [delivery, setDelivery] = useState([]);

  const deliveryMan = useSelector((state) => state.user);

  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(exitRequest());
  }

  function handleShowEntregue() {
    setActivity(0);
    setStatus(true);
  }

  function handleShowPendente() {
    setActivity(1);
    setStatus('');
  }

  useEffect(() => {
    async function loadDelivery() {
      const response = await api.get(
        `pickup/${deliveryMan.id}?delivered=${status}`
      );
      const data = response.data.map((check) => ({
        ...check,
        formattedDate: format(parseISO(check.createdAt), 'dd/MM/yyyy', {
          ptBR,
        }),
      }));
      setDelivery(data);
    }
    loadDelivery();
  }, [status]);

  return (
    <>
      <StatusBar barStyle="dark-content" background="#fff" />
      <Container>
        <Header>
          <Image
            source={{
              uri:
                deliveryMan.url ||
                `https://ui-avatars.com/api/?size=140&background=f4effc&color=a28fd0&name=${deliveryMan.name}`,
            }}
          />
          <InfoDeliveryMan>
            <Text>Bem vindo de volta,</Text>
            <DeliveryManName>{deliveryMan.name}</DeliveryManName>
          </InfoDeliveryMan>

          <ExitIcon
            onPress={handleLogout}
            name="exit-to-app"
            color="#E74040"
            size={30}
          />
        </Header>
        <Delivery>
          <DeliveryHeader>
            <Title>Entregas</Title>
            <TouchableOpacity onPress={handleShowPendente}>
              <Pendente status={activity}>Pendentes</Pendente>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleShowEntregue}>
              <Entregue status={activity}>Entregues</Entregue>
            </TouchableOpacity>
          </DeliveryHeader>
          {delivery.map((item, index) => (
            <Status key={item.id}>
              <StatusHeader>
                <Icon name="local-shipping" size={20} color="#7D40E7" />
                <TitleStatus>
                  Encomenda{' '}
                  {`${index < 9 ? `0${index + 1}` : index + 1} - ${
                    item.product
                  }`}
                </TitleStatus>
              </StatusHeader>
              <ProgressBar status={item} />
              <Details>
                <View>
                  <RegisterTitle>Data</RegisterTitle>
                  <Date>{item.formattedDate}</Date>
                </View>
                <View>
                  <RegisterTitle>Cidade</RegisterTitle>
                  <City>{item.recipient.city}</City>
                </View>
                <ButtonDetails>
                  <DetailsText
                    onPress={() =>
                      navigation.navigate('DeliveryInfo', {
                        deliveryId: item.id,
                      })
                    }
                  >
                    Ver detalhes
                  </DetailsText>
                </ButtonDetails>
              </Details>
            </Status>
          ))}
        </Delivery>
      </Container>
    </>
  );
}
