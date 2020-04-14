import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;
export const Header = styled.View`
  flex-direction: row;
  padding: 30px 20px 10px 30px;
`;

export const InfoDeliveryMan = styled.View`
  margin: 10px;
`;

export const Image = styled.Image`
  width: 68px;
  height: 68px;
  border-radius: 34px;
`;
export const Text = styled.Text`
  font-size: 14px;
  color: #666666;
`;
export const DeliveryManName = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #444444;
`;

export const ExitIcon = styled(Icon)`
  margin: 20px 90px;
`;

export const Delivery = styled.ScrollView`
  flex: 1;
  padding: 10px 20px 10px;
  margin-bottom: 10px;
`;

export const DeliveryHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-right: 110px;
`;

export const Entregue = styled.Text`
  color: ${(props) => (props.status === 0 ? '#7d40e7' : '#666')};
  font-size: 12px;
  font-weight: bold;
  text-decoration: ${(props) => (props.status === 0 ? 'underline' : 'none')};
`;

export const Pendente = styled.Text`
  color: ${(props) => (props.status === 1 ? '#7d40e7' : '#666')};
  font-size: 12px;
  font-weight: bold;
  text-decoration: ${(props) => (props.status === 1 ? 'underline' : 'none')};
`;

export const Status = styled.View`
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #0000001a;
`;

export const StatusHeader = styled.View`
  flex-direction: row;
  padding: 10px;
`;

export const TitleStatus = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #7d40e7;
  margin-left: 10px;
`;

export const Details = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: 64px;
  width: 100%;
  align-items: center;
  background: #f8f9fd;
  padding: 15px;
`;

export const RegisterTitle = styled.Text`
  font-size: 8px;
  color: #999;
  font-weight: bold;
`;

export const Date = styled.Text`
  font-size: 12px;
  color: #444;
  font-weight: bold;
`;

export const City = styled.Text`
  font-size: 12px;
  color: #444;
  font-weight: bold;
`;

export const ButtonDetails = styled.TouchableOpacity`
  height: 15px;
  width: 70px;
`;

export const DetailsText = styled.Text`
  font-size: 12px;
  color: #7d40e7;
  font-weight: bold;
`;
