import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';
import Button from '~/components/Button';

export const Container = styled.View`
  background: #fff;
  flex: 1;
`;

export const Content = styled.View`
  margin: -60px 20px 0 20px;
  flex: 1;
`;

export const CameraView = styled.View`
  width: 100%;
  height: 90%;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
`;

export const Camera = styled(RNCamera)`
  flex: 1;
`;

export const CameraButton = styled.TouchableOpacity`
  height: 61px;
  width: 61px;
  border-radius: 30.5px;
  background: rgba(0, 0, 0, 0.4);
  align-items: center;
  align-self: center;
  justify-content: center;
  position: absolute;
  bottom: 20px;
`;

export const SubmitButton = styled(Button)`
  width: 352px;
  margin-top: 10px;
  background: #7d40e7;
`;
