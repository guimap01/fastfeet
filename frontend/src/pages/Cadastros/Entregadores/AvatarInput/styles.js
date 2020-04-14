import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin: 30px 0px 30px 375px;
  height: 150px;
  width: 150px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    input {
      display: none;
    }

    img {
      border-radius: 50%;
      height: 150px;
      width: 150px;
      border: 2px dashed #ddd;
      margin-top: 10px;
    }
  }
`;
