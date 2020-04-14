import styled from 'styled-components';

export const Container = styled.div`
  background: ${props => props.background};
  width: 115px;
  height: 27px;
  border-radius: 25px;
  padding: 5px;
  justify-content: center;
  align-items: center;
  display: flex;
  div {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background: ${props => props.color};
  }
  strong {
    font-size: 13px;
    color: ${props => props.color};
    margin-left: 6px;
  }
`;
