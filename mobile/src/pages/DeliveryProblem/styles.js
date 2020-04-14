import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background: #fff;
  padding: 30px;
`;

export const Content = styled.View`
  margin-top: -110px;
`;

export const InputProblem = styled.TextInput.attrs({
  textAlignVertical: 'top',
  placeholderTextColor: '#999',
  numberOfLines: 20,
  multiline: true,
  fontSize: 16,
})`
  width: 335px;
  height: 300px;
  background: #fff;
  border: 1px solid #0000001a;
  border-radius: 5px;
  padding: 15px;
`;

export const SubmitProblem = styled(Button)`
  width: 335px;
  background: #7d40e7;
  margin-top: 20px;
`;
