import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { View, StatusBar, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  Content,
  CameraView,
  CameraButton,
  SubmitButton,
  Camera,
} from './styles';

import api from '~/services/api';

export default function Signature({ navigation }) {
  const id = navigation.getParam('deliveryId');
  const [camera, setCamera] = useState(null);
  const [file, setFile] = useState('');

  async function takePicture() {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);

      await setFile(data.uri);
    }
  }

  async function handlePicture() {
    try {
      const data = new FormData();
      data.append('file', {
        uri: file,
        name: 'signature.jpg',
        type: 'image/jpg',
      });

      await api.post(`signatures?idDelivery=${id}`, data);
      Alert.alert('Entrega confirmada com sucesso');
      navigation.navigate('Dashboard');

      navigation.navigate('Dashboard');
    } catch (err) {
      Alert.alert('Não foi possivel confirmar a entrega');
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7d40e7" />
      <View style={{ backgroundColor: '#7d40e7', height: 100 }} />
      <Container>
        <Content>
          {file ? (
            <CameraView>
              <Image source={{ uri: file }} style={{ height: '100%' }} />
            </CameraView>
          ) : (
            <CameraView>
              <Camera
                ref={(ref) => {
                  setCamera(ref);
                }}
                type={Camera.Constants.Type.back}
                autoFocus={Camera.Constants.AutoFocus.on}
                flashMode={Camera.Constants.FlashMode.off}
                androidCameraPermissionOptions={{
                  title: 'Permissao para usar a camera',
                  message: 'Precisamos da sua permissão para utilizar a camera',
                  buttonPositive: 'Ok',
                  buttonNegative: 'Cancel',
                }}
              />
              <CameraButton onPress={takePicture}>
                <Icon name="camera-alt" size={30} color="#FFF" />
              </CameraButton>
            </CameraView>
          )}

          <SubmitButton onPress={handlePicture}>Enviar</SubmitButton>
        </Content>
      </Container>
    </>
  );
}

Signature.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
};
