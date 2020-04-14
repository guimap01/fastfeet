import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
  padding: 30px;
`;

export const Content = styled.View`
  margin-top: -110px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  align-self: center;
`;

export const ListProblems = styled.View`
  margin-top: 12px;
`;

export const ListProblem = styled.View`
  height: auto;
  background: #fff;
  border: 1px solid #0000001a;
  border-radius: 5px;
  padding: 10px;
  flex-direction: column;
  height: 60px;
`;

export const Description = styled.Text`
  font-size: 16px;
  color: #999999;
  margin-top: 5px;
`;

export const Date = styled.Text`
  align-self: flex-end;
  font-size: 12px;
  color: #c1c1c1;
`;
