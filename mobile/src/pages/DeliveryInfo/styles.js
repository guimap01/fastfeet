import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background: #fff;
  padding: 30px;
`;

export const Content = styled.ScrollView`
  margin-top: -110px;
`;

export const DeliveryInformation = styled.View`
  border-radius: 5px;
  border: 1px solid #0000001a;
  padding: 10px;
  background: #fff;
`;

export const HeaderInformation = styled.View`
  flex-direction: row;
`;

export const Title = styled.Text`
  margin-left: 5px;
  color: #7d40e7;
  font-weight: bold;
`;

export const DeliveryTitle = styled.Text`
  color: #999;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 5px;
`;

export const DeliveryData = styled.Text`
  color: #666;
  margin-bottom: 15px;
  text-transform: capitalize;
`;

export const DeliveryStatus = styled.View`
  border-radius: 5px;
  border: 1px solid #0000001a;
  padding: 10px;
  background: #fff;
  margin-top: 15px;
`;

export const HeaderStatus = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

export const DeliveryDates = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const DeliveryDate = styled.View`
  flex-direction: column;
`;

export const MenuBottom = styled.View`
  flex-direction: row;
  background: #f8f9fd;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #0000001a;
`;

export const ActionButtom = styled(RectButton)`
  width: 110px;
  border-radius: 5px;
  height: 83px;
  justify-content: center;
  align-items: center;
  background: ${(props) => (props.disabled ? '#ddd' : '#f8f9fd')};
`;

export const ButtonTitle = styled.Text`
  flex-wrap: wrap;
  text-align: center;
  font-size: 14px;
  color: #999999;
`;

export const ConfirmBox = styled.View`
  width: 332.8px;
  height: 83px;
  justify-content: center;
  align-items: center;
  background: #dff0df;
  margin-top: 10px;
  border: 1px solid #2ca42b;
  border-radius: 5px;
`;

export const ConfirmText = styled.Text`
  color: #2ca42b;
  font-weight: bold;
  font-size: 18px;
`;
