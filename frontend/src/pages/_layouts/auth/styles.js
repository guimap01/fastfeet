import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background-color: #7d40e7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  max-width: 360px;
  max-height: 425px;
  text-align: center;
  background: #fff;
  border-radius: 4px;

  img {
    margin-top: 60px;
    margin-bottom: 20px;
  }

  form {
    width: 100%;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    strong {
      font-size: 14px;
      color: #444;
      text-align: left;
      margin-left: 30px;
      margin-bottom: 10px;
    }

    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      height: 45px;
      width: 300px;
      padding: 0 15px;
      color: #000;
      margin: 0 0 10px;
      align-items: center;
      margin-left: 30px;
      margin-bottom: 15px;
    }

    span {
      color: #f64c75;
      font-size: 10px;
      margin: 0 0 10px;
      font-weight: bold;
      align-self: flex-start;
      margin-left: 30px;
    }

    button {
      width: 300px;
      height: 45px;
      background: #7d40e7;
      color: #fff;
      font-weight: bold;
      font-size: 16px;
      border-radius: 4px;
      border: 0;
      margin-left: 30px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.1, '#7d40e7')};
      }
    }
  }
`;
