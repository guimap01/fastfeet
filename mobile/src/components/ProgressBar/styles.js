import styled from 'styled-components/native';

export const Container = styled.View`
  margin: 20px 0;
  height: 44px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const Bar = styled.View`
  position: absolute;
  height: 1px;
  width: 80%;
  left: 10%;
  top: 9%;
  background-color: #7d40e7;
`;

export const Step = styled.View`
  align-items: center;
`;

export const Badge = styled.View`
  height: 10px;
  width: 10px;
  border-radius: 6px;
  border: 1px solid #7d40e7;
  background-color: ${(props) => (props.complete ? '#7D40E7' : '#fff')};
`;

export const Name = styled.Text`
  width: 60px;
  font-size: 9px;
  color: #999;
  flex-wrap: wrap;
  text-align: center;
  margin-top: 5px;
`;
