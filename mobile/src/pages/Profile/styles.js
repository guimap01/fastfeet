import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background: #fff;
  justify-content: center;
  align-items: center;
  padding: 0 35px;
`;
export const Image = styled.Image`
  height: 136px;
  width: 136px;
  border-radius: 68px;
  margin-bottom: 40px;
`;
export const Label = styled.Text`
  font-size: 12px;
  color: #666666;
  align-self: flex-start;
`;

export const Strong = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #444444;
  align-self: flex-start;
  margin-bottom: 15px;
`;

export const ExitButton = styled(Button)`
  background-color: #e74040;
  align-self: stretch;
  margin-top: 30px;
`;
